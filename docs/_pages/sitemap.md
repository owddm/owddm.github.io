---
title: "Sitemap"
layout: archive
excerpt: "A list of all the posts and pages found on the site"
permalink: /sitemap/
header:
  image: /assets/images/header-owddm.png
sitemap: false
search: false
---

<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

A list of all the posts and pages found on the site. For you robots out there is an [XML version]({{ "sitemap.xml" | absolute_url }}) available for digesting as well.

<h2>Pages</h2>
<div class="grid__wrapper">
{% for post in site.pages %}
  {% include archive-single.html type="grid" %}
{% endfor %}
</div>

<hr>

<h2>Posts</h2>
<div class="grid__wrapper">

{% for post in site.posts %}
  {% include archive-single.html type="grid" %}
{% endfor %}
</div>

{% capture written_label %}'None'{% endcapture %}

{% for collection in site.collections %}
{% unless collection.output == false or collection.label == "posts" %}
  {% capture label %}{{ collection.label }}{% endcapture %}
  {% if label != written_label %}
  <h2>{{ label }}</h2>
  {% capture written_label %}{{ label }}{% endcapture %}
  {% endif %}
{% endunless %}
{% for post in collection.docs %}
  {% unless collection.output == false or collection.label == "posts" %}
  {% include archive-single.html %}
  {% endunless %}
{% endfor %}
{% endfor %}

<script>
$(document).ready(function(){
$("a[href*='sitemap/']").parents('.grid__item').remove();
$("a[href*='.css']").parents('.grid__item').remove();
$("a[href*='.js']").parents('.grid__item').remove();
$("a[href*='.xml']").parents('.grid__item').remove();
$("a[href*='.txt']").parents('.grid__item').remove();
});
</script>
