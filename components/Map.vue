<template>
  <div class="map--container">
    <div class="map--map" ref="map">
      <a href="https://www.maptiler.com" style="position:absolute;left:10px;bottom:10px;z-index:999;"><img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo"></a>
    </div>
  </div>
</template>
<script lang="ts">
  import 'leaflet/dist/leaflet.css'

  async function createLayer (L: any) {
    // Copied from: https://github.com/maplibre/maplibre-gl-leaflet/blob/2b9ccf4f434fe19ee672591b21230579e68848f6/leaflet-maplibre-gl.js
    const maplibregl = await import('maplibre-gl')
    return L.Layer.extend({
          options: {
          updateInterval: 32,
          // How much to extend the overlay view (relative to map size)
          // e.g. 0.1 would be 10% of map view in each direction
          padding: 0.1,
          // whether or not to register the mouse and keyboard
          // events on the maplibre overlay
          interactive: false,
          // set the tilepane as the default pane to draw gl tiles
          pane: 'tilePane'
      },

      initialize (options: any) {
          L.setOptions(this, options);

          // setup throttling the update event when panning
          this._throttledUpdate = L.Util.throttle(this._update, this.options.updateInterval, this);
      },

      onAdd (map: any) {
          if (!this._container) {
              this._initContainer();
          }

          var paneName = this.getPaneName();
          map.getPane(paneName).appendChild(this._container);

          this._initGL();

          this._offset = this._map.containerPointToLayerPoint([0, 0]);

          // work around https://github.com/mapbox/mapbox-gl-leaflet/issues/47
          if (map.options.zoomAnimation) {
              L.DomEvent.on(map._proxy, L.DomUtil.TRANSITION_END, this._transitionEnd, this);
          }
      },

      onRemove (map: any) {
          if (this._map._proxy && this._map.options.zoomAnimation) {
              L.DomEvent.off(this._map._proxy, L.DomUtil.TRANSITION_END, this._transitionEnd, this);
          }
          var paneName = this.getPaneName();
          map.getPane(paneName).removeChild(this._container);

          this._glMap.remove();
          this._glMap = null;
      },

      getEvents () {
          return {
              move: this._throttledUpdate, // sensibly throttle updating while panning
              zoomanim: this._animateZoom, // applys the zoom animation to the <canvas>
              zoom: this._pinchZoom, // animate every zoom event for smoother pinch-zooming
              zoomstart: this._zoomStart, // flag starting a zoom to disable panning
              zoomend: this._zoomEnd,
              resize: this._resize
          };
      },

      getMaplibreMap () {
          return this._glMap;
      },

      getCanvas () {
          return this._glMap.getCanvas();
      },

      getSize () {
          return this._map.getSize().multiplyBy(1 + this.options.padding * 2);
      },

      getBounds () {
          var halfSize = this.getSize().multiplyBy(0.5);
          var center = this._map.latLngToContainerPoint(this._map.getCenter());
          return L.latLngBounds(
              this._map.containerPointToLatLng(center.subtract(halfSize)),
              this._map.containerPointToLatLng(center.add(halfSize))
          );
      },

      getContainer () {
          return this._container;
      },

      // returns the pane name set in options if it is a valid pane, defaults to tilePane
      getPaneName () {
          return this._map.getPane(this.options.pane) ? this.options.pane : 'tilePane';
      },

      _roundPoint (p: { x: number, y: number }) {
          return {x: Math.round(p.x), y: Math.round(p.y)};
      },

      _initContainer () {
          var container = this._container = L.DomUtil.create('div', 'leaflet-gl-layer');

          var size = this.getSize();
          var offset = this._map.getSize().multiplyBy(this.options.padding);
          container.style.width  = size.x + 'px';
          container.style.height = size.y + 'px';

          var topLeft = this._map.containerPointToLayerPoint([0, 0]).subtract(offset);

          L.DomUtil.setPosition(container, this._roundPoint(topLeft));
      },

      _initGL () {
          var center = this._map.getCenter();

          var options = L.extend({}, this.options, {
              container: this._container,
              center: [center.lng, center.lat],
              zoom: this._map.getZoom() - 1,
              attributionControl: false
          });

          this._glMap = new maplibregl.Map(options);

          // allow GL base map to pan beyond min/max latitudes
          this._glMap.transform.latRange = null;
          this._glMap.transform.maxValidLatitude = Infinity;

          this._transformGL(this._glMap);

          if (this._glMap._canvas.canvas) {
              // older versions of mapbox-gl surfaced the canvas differently
              this._glMap._actualCanvas = this._glMap._canvas.canvas;
          } else {
              this._glMap._actualCanvas = this._glMap._canvas;
          }

          // treat child <canvas> element like L.ImageOverlay
          var canvas = this._glMap._actualCanvas;
          L.DomUtil.addClass(canvas, 'leaflet-image-layer');
          L.DomUtil.addClass(canvas, 'leaflet-zoom-animated');
          if (this.options.interactive) {
              L.DomUtil.addClass(canvas, 'leaflet-interactive');
          }
          if (this.options.className) {
              L.DomUtil.addClass(canvas, this.options.className);
          }
      },

      _update (e: Event) {
          // update the offset so we can correct for it later when we zoom
          this._offset = this._map.containerPointToLayerPoint([0, 0]);

          if (this._zooming) {
              return;
          }

          var size = this.getSize(),
              container = this._container,
              gl = this._glMap,
              offset = this._map.getSize().multiplyBy(this.options.padding),
              topLeft = this._map.containerPointToLayerPoint([0, 0]).subtract(offset);

          L.DomUtil.setPosition(container, this._roundPoint(topLeft));

          this._transformGL(gl);

          if (gl.transform.width !== size.x || gl.transform.height !== size.y) {
              container.style.width  = size.x + 'px';
              container.style.height = size.y + 'px';
              if (gl._resize !== null && gl._resize !== undefined){
                  gl._resize();
              } else {
                  gl.resize();
              }
          } else {
              // older versions of mapbox-gl surfaced update publicly
              if (gl._update !== null && gl._update !== undefined){
                  gl._update();
              } else {
                  gl.update();
              }
          }
      },

      _transformGL: function (gl: any) {
          var center = this._map.getCenter();

          // gl.setView([center.lat, center.lng], this._map.getZoom() - 1, 0);
          // calling setView directly causes sync issues because it uses requestAnimFrame

          var tr = gl.transform;
          tr.center = maplibregl.LngLat.convert([center.lng, center.lat]);
          tr.zoom = this._map.getZoom() - 1;
      },

      // update the map constantly during a pinch zoom
      _pinchZoom () {
          this._glMap.jumpTo({
              zoom: this._map.getZoom() - 1,
              center: this._map.getCenter()
          });
      },

      // borrowed from L.ImageOverlay
      // https://github.com/Leaflet/Leaflet/blob/master/src/layer/ImageOverlay.js#L139-L144
      _animateZoom (e: any) {
          var scale = this._map.getZoomScale(e.zoom);
          var padding = this._map.getSize().multiplyBy(this.options.padding * scale);
          var viewHalf = this.getSize()._divideBy(2);
          // corrections for padding (scaled), adapted from
          // https://github.com/Leaflet/Leaflet/blob/master/src/map/Map.js#L1490-L1508
          var topLeft = this._map.project(e.center, e.zoom)
              ._subtract(viewHalf)
              ._add(this._map._getMapPanePos()
              .add(padding))._round();
          var offset = this._map.project(this._map.getBounds().getNorthWest(), e.zoom)
              ._subtract(topLeft);

          L.DomUtil.setTransform(
              this._glMap._actualCanvas,
              offset.subtract(this._offset),
              scale
          );
      },

      _zoomStart () {
          this._zooming = true;
      },

      _zoomEnd () {
          var scale = this._map.getZoomScale(this._map.getZoom());

          L.DomUtil.setTransform(
              this._glMap._actualCanvas,
              // https://github.com/mapbox/mapbox-gl-leaflet/pull/130
              null,
              scale
          );

          this._zooming = false;

          this._update();
      },

      _transitionEnd () {
          L.Util.requestAnimFrame(function (this: any) {
              var zoom = this._map.getZoom();
              var center = this._map.getCenter();
              var offset = this._map.latLngToContainerPoint(
                  this._map.getBounds().getNorthWest()
              );

              // reset the scale and offset
              L.DomUtil.setTransform(this._glMap._actualCanvas, offset, 1);

              // enable panning once the gl map is ready again
              this._glMap.once('moveend', L.Util.bind(function (this: any) {
                  this._zoomEnd();
              }, this));

              // update the map position
              this._glMap.jumpTo({
                  center: center,
                  zoom: zoom - 1
              });
          }, this);
      },

      _resize: function (e: any) {
          this._transitionEnd(e);
      }
    })
  }
  export default {
    mounted () {
      let mounted = true
      let map: any
      const p = (async () => {
        const L = await import('leaflet')
        const MaplibreLayer = await createLayer(L)
        await new Promise(resolve => setTimeout(resolve, 100))
        const key = '8JZtFquVr4EgrXWK57Kx'
        const mapId = '53ec7d02-deae-4eb4-8294-406ed07b3271'
        if (!mounted) {
          return
        }
        map = L.map(this.$refs.map as HTMLElement).setView([34.82801, 135.57879], 9.4)
        const gl = new MaplibreLayer({
          attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
          style: `https://api.maptiler.com/maps/${mapId}/style.json?key=${key}`
        })
        gl.addTo(map)
        L.marker([34.82801, 135.57879], {
          icon: L.divIcon({
            iconAnchor: [37, 109],
            iconSize: [200, 109],
            className: 'owddm-map-marker',
            html: `<img src="/_nuxt/assets/map/marker/kwddm.svg" class="map-event--image"><div class="map-event--label"><div class="map-event--title">Gamepad KPI's</div><div class="map-event--info">two weeks ago!</div></div>`
          })
        }).addTo(map)
      })()
      return () => {
        mounted = false
        if (map) {
          map.off()
          map.remove()
        }
      }
    }
  }
</script>
