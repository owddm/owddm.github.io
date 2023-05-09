<template>
  <section>
    <h1 class="join-title">Join</h1>
    <div class="join-content-outer-container">
      <div class="join-content-inner-container">
        <div class="join-content-container-one">
          <div>
            <h2>
              <span class="mr-05"
                ><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M99 414.3c1.1 5.7-2.3 11.1-8 12.3-5.4 1.1-10.9-2.3-12-8-1.1-5.4 2.3-11.1 7.7-12.3 5.4-1.2 11.1 2.3 12.3 8zm143.1 71.4c-6.3 4.6-8 13.4-3.7 20 4.6 6.6 13.4 8.3 20 3.7 6.3-4.6 8-13.4 3.4-20-4.2-6.5-13.1-8.3-19.7-3.7zm-86-462.3c6.3-1.4 10.3-7.7 8.9-14-1.1-6.6-7.4-10.6-13.7-9.1-6.3 1.4-10.3 7.7-9.1 14 1.4 6.6 7.6 10.6 13.9 9.1zM34.4 226.3c-10-6.9-23.7-4.3-30.6 6-6.9 10-4.3 24 5.7 30.9 10 7.1 23.7 4.6 30.6-5.7 6.9-10.4 4.3-24.1-5.7-31.2zm272-170.9c10.6-6.3 13.7-20 7.7-30.3-6.3-10.6-19.7-14-30-7.7s-13.7 20-7.4 30.6c6 10.3 19.4 13.7 29.7 7.4zm-191.1 58c7.7-5.4 9.4-16 4.3-23.7s-15.7-9.4-23.1-4.3c-7.7 5.4-9.4 16-4.3 23.7 5.1 7.8 15.6 9.5 23.1 4.3zm372.3 156c-7.4 1.7-12.3 9.1-10.6 16.9 1.4 7.4 8.9 12.3 16.3 10.6 7.4-1.4 12.3-8.9 10.6-16.6-1.5-7.4-8.9-12.3-16.3-10.9zm39.7-56.8c-1.1-5.7-6.6-9.1-12-8-5.7 1.1-9.1 6.9-8 12.6 1.1 5.4 6.6 9.1 12.3 8 5.4-1.5 9.1-6.9 7.7-12.6zM447 138.9c-8.6 6-10.6 17.7-4.9 26.3 5.7 8.6 17.4 10.6 26 4.9 8.3-6 10.3-17.7 4.6-26.3-5.7-8.7-17.4-10.9-25.7-4.9zm-6.3 139.4c26.3 43.1 15.1 100-26.3 129.1-17.4 12.3-37.1 17.7-56.9 17.1-12 47.1-69.4 64.6-105.1 32.6-1.1.9-2.6 1.7-3.7 2.9-39.1 27.1-92.3 17.4-119.4-22.3-9.7-14.3-14.6-30.6-15.1-46.9-65.4-10.9-90-94-41.1-139.7-28.3-46.9.6-107.4 53.4-114.9C151.6 70 234.1 38.6 290.1 82c67.4-22.3 136.3 29.4 130.9 101.1 41.1 12.6 52.8 66.9 19.7 95.2zm-70 74.3c-3.1-20.6-40.9-4.6-43.1-27.1-3.1-32 43.7-101.1 40-128-3.4-24-19.4-29.1-33.4-29.4-13.4-.3-16.9 2-21.4 4.6-2.9 1.7-6.6 4.9-11.7-.3-6.3-6-11.1-11.7-19.4-12.9-12.3-2-17.7 2-26.6 9.7-3.4 2.9-12 12.9-20 9.1-3.4-1.7-15.4-7.7-24-11.4-16.3-7.1-40 4.6-48.6 20-12.9 22.9-38 113.1-41.7 125.1-8.6 26.6 10.9 48.6 36.9 47.1 11.1-.6 18.3-4.6 25.4-17.4 4-7.4 41.7-107.7 44.6-112.6 2-3.4 8.9-8 14.6-5.1 5.7 3.1 6.9 9.4 6 15.1-1.1 9.7-28 70.9-28.9 77.7-3.4 22.9 26.9 26.6 38.6 4 3.7-7.1 45.7-92.6 49.4-98.3 4.3-6.3 7.4-8.3 11.7-8 3.1 0 8.3.9 7.1 10.9-1.4 9.4-35.1 72.3-38.9 87.7-4.6 20.6 6.6 41.4 24.9 50.6 11.4 5.7 62.5 15.7 58.5-11.1zm5.7 92.3c-10.3 7.4-12.9 22-5.7 32.6 7.1 10.6 21.4 13.1 32 6 10.6-7.4 13.1-22 6-32.6-7.4-10.6-21.7-13.5-32.3-6z" /></svg></span
              >RSVP to an Event
            </h2>
            <p>No need to be shy! No prior skill required, if you are interested in the topic, please join us!</p>
            <div class="upcoming-events">
              <div v-if="pending">Loading ...</div>
              <div v-else>
                <div>
                  <MeetupEventList :events="events" :years="events_year" :show-headers="false" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 class="mt-2">
              <span
                ><svg fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 314 314" xml:space="preserve">
                  <path
                    d="M254.217,135.559c0-3.866-3.134-7-7-7h-19.805V74.012C227.412,33.201,195.826,0,157.001,0
	c-38.826,0-70.413,33.201-70.413,74.012v54.547H66.783c-3.866,0-7,3.134-7,7c0,47.963,32.466,88.205,75.804,98.347v40.544H116.05
	c-11.736,0-21.284,8.871-21.284,19.775S104.313,314,116.05,314h81.9c11.736,0,21.285-8.871,21.285-19.775
	s-9.549-19.775-21.285-19.775h-19.537v-40.543C221.751,223.764,254.217,183.521,254.217,135.559z M157.001,14
	c24.9,0,46.069,17.259,53.53,41.117h-27.854c-3.866,0-7,3.134-7,7s3.134,7,7,7h30.532c0.123,1.616,0.203,3.245,0.203,4.895v23.775
	h-30.735c-3.866,0-7,3.134-7,7c0,3.866,3.134,7,7,7h30.735v23.771c0,1.649-0.08,3.279-0.203,4.896h-30.532c-3.866,0-7,3.134-7,7
	s3.134,7,7,7h27.854c-7.461,23.858-28.63,41.117-53.53,41.117c-24.901,0-46.07-17.259-53.531-41.117h27.853c3.866,0,7-3.134,7-7
	s-3.134-7-7-7h-30.532c-0.123-1.616-0.203-3.246-0.203-4.896v-23.773h30.735c3.866,0,7-3.134,7-7c0-3.866-3.134-7-7-7h-30.735
	V74.012c0-1.649,0.08-3.278,0.203-4.895h30.532c3.866,0,7-3.134,7-7s-3.134-7-7-7h-27.854C110.93,31.259,132.1,14,157.001,14z
	 M74.051,142.559h12.86c3.368,37.539,33.511,67.013,70.09,67.013c36.578,0,66.721-29.474,70.088-67.013h12.86
	c-3.427,44.611-39.32,79.816-82.948,79.816C113.372,222.375,77.478,187.17,74.051,142.559z M205.235,294.225
	c0,3.131-3.336,5.775-7.285,5.775h-81.9c-3.948,0-7.284-2.645-7.284-5.775c0-3.131,3.336-5.775,7.284-5.775h81.9
	C201.899,288.449,205.235,291.094,205.235,294.225z M164.413,274.449h-14.826v-38.365c2.447,0.192,4.92,0.291,7.414,0.291
	c2.493,0,4.965-0.099,7.412-0.291V274.449z" /></svg
              ></span>
              Present at an Event
            </h2>
            <p>
              We always welcome new presenters and presentations. If you have a topic that is related to web design or web development. Please don't hesitate to create a post in
              <a href="https://discord.com/channels/1034792577293094972/1034862103653257306">#presentation-proposals</a> on Discord or use this private form.
            </p>
            <a href="https://forms.gle/KifJzLSmcXUPxSFk7">
              <button>→ Submit a presentation proposal</button>
            </a>
          </div>
          <div>
            <h2 class="mt-2">
              <span
                ><svg height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 495.622 495.622" xml:space="preserve">
                  <g>
                    <path
                      style="fill: #030104"
                      d="M495.622,113.089v150.03c0,0-32.11,6.326-38.725,7.158c-6.594,0.83-27.316,7.521-42.334-6.914
		c-23.16-22.197-105.447-104.03-105.447-104.03s-14.188-13.922-36.969-1.89c-20.912,11.022-51.911,27.175-64.859,33.465
		c-24.477,13.028-44.764-7.642-44.764-23.387c0-12.213,7.621-20.502,18.515-26.598c29.524-17.898,91.752-52.827,117.67-66.598
		c15.754-8.379,27.105-9.097,48.734,9.124c26.638,22.403,50.344,42.824,50.344,42.824s7.732,6.453,20.063,3.854
		C448.13,123.725,495.622,113.089,495.622,113.089z M168.098,367.3c3.985-10.238,2.653-21.689-4.987-29.545
		c-6.865-7.027-16.888-8.879-26.445-6.689c2.673-9.479,1.197-19.568-5.705-26.688c-6.886-7.009-16.89-8.898-26.446-6.688
		c2.653-9.465,1.181-19.553-5.725-26.652c-10.814-11.092-29.519-10.616-41.807,1.097c-12.223,11.729-20.053,32.979-9.144,45.487
		c10.891,12.445,23.405,4.873,32.945,2.699c-2.654,9.465-10.606,18.269-0.813,30.658c9.784,12.395,23.404,4.875,32.954,2.721
		c-2.663,9.429-10.268,19.117-0.851,30.604c9.502,11.522,25.065,5.383,35.344,2.19c-3.967,10.199-12.458,21.193-1.549,33.513
		c10.892,12.409,36.063,6.668,48.358-5.063c12.262-11.729,13.439-30.318,2.654-41.445
		C189.435,365.865,178.335,364.089,168.098,367.3z M392.442,289.246c-88.88-88.881-47.075-47.058-94.906-94.992
		c0,0-14.375-14.311-33.321-5.998c-13.3,5.828-30.423,13.771-43.307,19.835c-14.158,7.424-24.347,9.722-29.131,9.69
		c-27.37-0.179-49.576-22.178-49.576-49.521c0-17.738,9.417-33.181,23.462-41.947c19.75-13.667,65.21-37.847,65.21-37.847
		s-13.849-17.549-44.187-17.549c-30.329,0-93.695,41.512-93.695,41.512s-17.976,11.514-43.601,1.143L0,96.373V268.05
		c0,0,14.103,4.082,26.775,9.258c2.862-8.162,7.48-15.699,13.886-21.924c21.023-20.024,55.869-20.232,74.996-0.537
		c5.762,5.987,9.783,13.129,11.835,21.024c7.707,2.379,14.688,6.593,20.298,12.373c5.779,5.947,9.785,13.129,11.854,20.984
		c7.698,2.381,14.669,6.611,20.298,12.395c6.339,6.537,10.562,14.433,12.534,22.988c8.047,2.344,15.319,6.705,21.176,12.693
		c11.495,11.807,15.575,27.826,13.103,43.278c0.02,0,0.058,0,0.076,0.035c0.188,0.246,7.122,7.976,11.446,12.336
		c8.474,8.482,22.311,8.482,30.811,0c8.444-8.479,8.481-22.289,0-30.811c-0.304-0.303-30.572-31.963-28.136-34.418
		c2.418-2.438,40.981,37.688,41.699,38.422c8.463,8.465,22.291,8.465,30.792,0c8.481-8.479,8.463-22.289,0-30.791
		c-0.416-0.396-2.152-2.059-2.796-2.721c0,0-38.234-34.06-35.324-36.97c2.946-2.928,50.438,41.392,50.515,41.392
		c8.537,7.688,21.687,7.631,29.9-0.586c7.991-7.99,8.162-20.629,1.078-29.146c-0.15-0.453-36.194-38.121-33.381-40.955
		c2.854-2.871,38.519,33.853,38.594,33.929c8.444,8.463,22.291,8.463,30.792,0c8.463-8.464,8.463-22.291,0-30.83
		C392.706,289.396,392.555,289.32,392.442,289.246z" />
                  </g></svg
              ></span>
              Become a volunteer
            </h2>
            <p>
              OWDDM is - and always has been - volunteer driven. There are always things that we can improve together. If you like what we are doing here and would like to help us, please create a new thread in the <a href="https://discord.gg/rUhpxzhg">#issues channel</a> on
              Discord.
            </p>
          </div>
        </div>
        <div class="join-content-container-two">
          <div>
            <h2 class="section-header">
              <span
                ><svg fill="#7289da" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <rect height="512" rx="15%" width="512" />
                  <path d="m346 392-21-25c41-11 57-39 57-39-52 49-194 51-249 0 0 0 14 26 56 39l-23 25c-70-1-97-48-97-48 0-104 46-187 46-187 47-33 90-33 90-33l3 4c-58 16-83 42-83 42 68-46 208-42 263 0 1-1-33-28-86-42l5-4s43 0 90 33c0 0 46 83 46 187 0 0-27 47-97 48z" fill="#fff" />
                  <ellipse cx="196" cy="279" rx="33" ry="35" />
                  <ellipse cx="312" cy="279" rx="33" ry="35" /></svg
              ></span>
              Talk with us online
            </h2>
            <p>We have our own Discord where we can talk about work, coding, design and coworking. Join us for a more-vibrant together.</p>
            <iframe class="discord-widget" src="https://discord.com/widget?id=1034792577293094972&theme=dark" width="90%" height="300" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
          </div>
          <div>
            <h2 class="mt-2">
              <span
                ><svg width="800px" height="800px" viewBox="-4 0 34 34" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fill-rule="evenodd">
                    <g transform="translate(1)">
                      <rect stroke="#474747" stroke-width="2" y="1" width="24" height="32" rx="1" />
                      <g fill="#575757">
                        <path d="M7 12h12v1H7z" />
                        <path d="M5 12h1v1H5z" />
                        <path d="M5 15h1v1H5z" />
                        <path d="M7 15h12v1H7z" />
                        <path d="M5 18h1v1H5z" />
                        <path d="M7 18h12v1H7z" />
                        <path d="M5 21h1v1H5z" />
                        <path d="M7 21h12v1H7z" />
                      </g>
                    </g>
                  </g></svg
              ></span>
              Share your opinion
            </h2>
            <p>To figure out if we are doing alright, or if we should change speeds we have a survey prepared.</p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfzo6DecghqIfir5O-2eiuQXPf81j97XcOCVEr6eJgUSEGeMw/viewform">
              <button>→ Fill out our Survey</button>
            </a>
          </div>
          <div>
            <h2 class="mt-2">
              <span
                ><svg width="800px" height="800px" viewBox="-4 0 34 34" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fill-rule="evenodd">
                    <g transform="translate(1)">
                      <rect stroke="#474747" stroke-width="2" y="1" width="24" height="32" rx="1" />
                      <g fill="#575757">
                        <path d="M7 12h12v1H7z" />
                        <path d="M5 12h1v1H5z" />
                        <path d="M5 15h1v1H5z" />
                        <path d="M7 15h12v1H7z" />
                        <path d="M5 18h1v1H5z" />
                        <path d="M7 18h12v1H7z" />
                        <path d="M5 21h1v1H5z" />
                        <path d="M7 21h12v1H7z" />
                      </g>
                    </g>
                  </g></svg
              ></span>
              Follow us
            </h2>
            <p>Stay up to date on new events and other information about the meetup.</p>
            <div class="button-container">
              <a href="https://twitter.com/owddm">
                <button class="follow-us-button">
                  <span
                    ><!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
                    <svg class="svg-type-2" enable-background="new 0 0 56.693 56.693" height="56.693px" id="Layer_1" version="1.1" viewBox="0 0 56.693 56.693" width="56.693px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <path
                        d="M52.837,15.065c-1.811,0.805-3.76,1.348-5.805,1.591c2.088-1.25,3.689-3.23,4.444-5.592c-1.953,1.159-4.115,2-6.418,2.454  c-1.843-1.964-4.47-3.192-7.377-3.192c-5.581,0-10.106,4.525-10.106,10.107c0,0.791,0.089,1.562,0.262,2.303  c-8.4-0.422-15.848-4.445-20.833-10.56c-0.87,1.492-1.368,3.228-1.368,5.082c0,3.506,1.784,6.6,4.496,8.412  c-1.656-0.053-3.215-0.508-4.578-1.265c-0.001,0.042-0.001,0.085-0.001,0.128c0,4.896,3.484,8.98,8.108,9.91  c-0.848,0.23-1.741,0.354-2.663,0.354c-0.652,0-1.285-0.063-1.902-0.182c1.287,4.015,5.019,6.938,9.441,7.019  c-3.459,2.711-7.816,4.327-12.552,4.327c-0.815,0-1.62-0.048-2.411-0.142c4.474,2.869,9.786,4.541,15.493,4.541  c18.591,0,28.756-15.4,28.756-28.756c0-0.438-0.009-0.875-0.028-1.309C49.769,18.873,51.483,17.092,52.837,15.065z" /></svg
                  ></span>
                  Follow us on Twitter
                </button>
              </a>
              <a href="https://www.meetup.com/ja-JP/osaka-web-designers-and-developers-meetup/">
                <button class="follow-us-button">
                  <span
                    ><svg class="svg-type-2" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M99 414.3c1.1 5.7-2.3 11.1-8 12.3-5.4 1.1-10.9-2.3-12-8-1.1-5.4 2.3-11.1 7.7-12.3 5.4-1.2 11.1 2.3 12.3 8zm143.1 71.4c-6.3 4.6-8 13.4-3.7 20 4.6 6.6 13.4 8.3 20 3.7 6.3-4.6 8-13.4 3.4-20-4.2-6.5-13.1-8.3-19.7-3.7zm-86-462.3c6.3-1.4 10.3-7.7 8.9-14-1.1-6.6-7.4-10.6-13.7-9.1-6.3 1.4-10.3 7.7-9.1 14 1.4 6.6 7.6 10.6 13.9 9.1zM34.4 226.3c-10-6.9-23.7-4.3-30.6 6-6.9 10-4.3 24 5.7 30.9 10 7.1 23.7 4.6 30.6-5.7 6.9-10.4 4.3-24.1-5.7-31.2zm272-170.9c10.6-6.3 13.7-20 7.7-30.3-6.3-10.6-19.7-14-30-7.7s-13.7 20-7.4 30.6c6 10.3 19.4 13.7 29.7 7.4zm-191.1 58c7.7-5.4 9.4-16 4.3-23.7s-15.7-9.4-23.1-4.3c-7.7 5.4-9.4 16-4.3 23.7 5.1 7.8 15.6 9.5 23.1 4.3zm372.3 156c-7.4 1.7-12.3 9.1-10.6 16.9 1.4 7.4 8.9 12.3 16.3 10.6 7.4-1.4 12.3-8.9 10.6-16.6-1.5-7.4-8.9-12.3-16.3-10.9zm39.7-56.8c-1.1-5.7-6.6-9.1-12-8-5.7 1.1-9.1 6.9-8 12.6 1.1 5.4 6.6 9.1 12.3 8 5.4-1.5 9.1-6.9 7.7-12.6zM447 138.9c-8.6 6-10.6 17.7-4.9 26.3 5.7 8.6 17.4 10.6 26 4.9 8.3-6 10.3-17.7 4.6-26.3-5.7-8.7-17.4-10.9-25.7-4.9zm-6.3 139.4c26.3 43.1 15.1 100-26.3 129.1-17.4 12.3-37.1 17.7-56.9 17.1-12 47.1-69.4 64.6-105.1 32.6-1.1.9-2.6 1.7-3.7 2.9-39.1 27.1-92.3 17.4-119.4-22.3-9.7-14.3-14.6-30.6-15.1-46.9-65.4-10.9-90-94-41.1-139.7-28.3-46.9.6-107.4 53.4-114.9C151.6 70 234.1 38.6 290.1 82c67.4-22.3 136.3 29.4 130.9 101.1 41.1 12.6 52.8 66.9 19.7 95.2zm-70 74.3c-3.1-20.6-40.9-4.6-43.1-27.1-3.1-32 43.7-101.1 40-128-3.4-24-19.4-29.1-33.4-29.4-13.4-.3-16.9 2-21.4 4.6-2.9 1.7-6.6 4.9-11.7-.3-6.3-6-11.1-11.7-19.4-12.9-12.3-2-17.7 2-26.6 9.7-3.4 2.9-12 12.9-20 9.1-3.4-1.7-15.4-7.7-24-11.4-16.3-7.1-40 4.6-48.6 20-12.9 22.9-38 113.1-41.7 125.1-8.6 26.6 10.9 48.6 36.9 47.1 11.1-.6 18.3-4.6 25.4-17.4 4-7.4 41.7-107.7 44.6-112.6 2-3.4 8.9-8 14.6-5.1 5.7 3.1 6.9 9.4 6 15.1-1.1 9.7-28 70.9-28.9 77.7-3.4 22.9 26.9 26.6 38.6 4 3.7-7.1 45.7-92.6 49.4-98.3 4.3-6.3 7.4-8.3 11.7-8 3.1 0 8.3.9 7.1 10.9-1.4 9.4-35.1 72.3-38.9 87.7-4.6 20.6 6.6 41.4 24.9 50.6 11.4 5.7 62.5 15.7 58.5-11.1zm5.7 92.3c-10.3 7.4-12.9 22-5.7 32.6 7.1 10.6 21.4 13.1 32 6 10.6-7.4 13.1-22 6-32.6-7.4-10.6-21.7-13.5-32.3-6z" /></svg
                  ></span>
                  Join our Meetup Group
                </button>
              </a>
              <!--<a href="">
                <button class="follow-us-button">
                  <span
                    ><svg class="svg-type-2" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 18C7 18.5523 6.55228 19 6 19C5.44772 19 5 18.5523 5 18C5 17.4477 5.44772 17 6 17C6.55228 17 7 17.4477 7 18Z" stroke="#323232" stroke-width="2" />
                      <path d="M11 19C11 15.6863 8.31371 13 5 13" stroke="#323232" stroke-width="2" stroke-linecap="round" />
                      <path d="M15 19C15 13.4772 10.5228 9 5 9" stroke="#323232" stroke-width="2" stroke-linecap="round" />
                      <path d="M19 19C19 11.268 12.732 5 5 5" stroke="#323232" stroke-width="2" stroke-linecap="round" /></svg
                  ></span>
                  Follow our RSS Feed
                </button>
              </a>
              <a href="">
                <button class="follow-us-button">
                  <span
                    ><svg class="svg-type-2" version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
                      <g>
                        <path
                          fill="#231F20"
                          d="M60,4h-7V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H17V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H4
		C1.789,4,0,5.789,0,8v52c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V8C64,5.789,62.211,4,60,4z M18,53c0,0.553-0.447,1-1,1h-6
		c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z M18,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5
		c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M18,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6
		c0.553,0,1,0.447,1,1V31z M30,53c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z
		 M30,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M30,31
		c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V31z M42,53c0,0.553-0.447,1-1,1h-6
		c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z M42,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5
		c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M42,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6
		c0.553,0,1,0.447,1,1V31z M54,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z
		 M54,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V31z M62,15H2V8
		c0-1.104,0.896-2,2-2h7v4c0,1.657,1.343,3,3,3s3-1.343,3-3V6h30v4c0,1.657,1.343,3,3,3s3-1.343,3-3V6h7c1.104,0,2,0.896,2,2V15z" />
                      </g></svg
                  ></span>
                  Add our Calendar to Google Cal
                </button>
              </a>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import dayjs, { Dayjs } from "dayjs/esm";
import MeetupEventList from "~~/components/SiteMainEvents/MeetupEventList.vue";
import { useEvents, GroupIDFromGroupType, Event } from "~~/utils/events";
import { getYearFromMeetupEvents, getUniqueItems, isUpcoming } from "~~/utils/utils";

let events: Event[];
let events_year: number[];

const { pending, data } = await useEvents();

watchEffect(() => {
  if (!data.value) return;

  events = Array.from(data.value.events);

  events = events?.filter((event) => {
    return isUpcoming(dayjs(event?.time));
  });

  events = events?.sort(function (event_a, event_b) {
    return event_b.time - event_a.time;
  });

  // * Pass an array of unique years to MeetupEventList
  events_year = getUniqueItems(getYearFromMeetupEvents(events));
});
</script>

<style scoped>
.join-title {
  margin-left: 1rem;
  margin-top: 3rem;
  font-size: 2.2rem;
}

.join-content-outer-container {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
.join-content-inner-container {
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
}

.join-content-container-one {
  max-width: 50%;
  margin-left: 1rem;
  margin-right: 1rem;
}
.join-content-container-two {
  max-width: 50%;
  margin-left: 1rem;
  margin-right: 1rem;
}

.upcoming-events {
  margin-left: -1rem;
  margin-top: 1rem;
}

p {
  margin-top: 0.5rem;
  font-weight: 300;
}

a {
  color: var(--color-blue);
}

a:hover {
  color: var(--color-osaka);
}

button {
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 15px;
  margin-top: 0.5rem;
}

h2 {
  font-weight: 300;
  color: gray;
}

.mt-1 {
  margin-top: 1rem;
}
.mt-2 {
  margin-top: 2rem;
}

.mr-1 {
  margin-right: 1rem;
}
.mr-05 {
  margin-right: 0.5rem;
}

svg {
  width: 20px;
  height: 20px;
  fill: gray;
}

.svg-type-2 {
  width: 15px;
  height: 15px;
  fill: var(--color-blue);
  margin-right: 0.5rem;
}

.button-container {
  display: flex;
  flex-direction: column;
}

.follow-us-button {
  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: white;
  color: var(--color-blue);
  font-weight: 600;
  border: 1px solid var(--color-blue);
}

.follow-us-button:hover {
  color: var(--color-osaka);
  border-color: var(--color-osaka);
}

.discord-widget {
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  display: block;
}

@media only screen and (max-width: 420px) {
  .join-content-inner-container {
    flex-direction: column;
  }

  .join-content-container-one {
    max-width: 100%;
  }
  .join-content-container-two {
    max-width: 100%;
  }

  .section-header {
    margin-top: 2rem;
  }
}

@media screen and (orientation: landscape) and (max-width: 896px) {
  .join-title {
    margin-left: env(safe-area-inset-left, 2rem);
  }
  .join-content-inner-container {
    margin-left: env(safe-area-inset-left, 2rem);
    margin-right: env(safe-area-inset-right, 2rem);
  }
}
</style>
