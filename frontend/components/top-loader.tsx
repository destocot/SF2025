import NextTopLoader from "nextjs-toploader"

export const TopLoader = () => (
  <NextTopLoader
    color="red" // matches .bar background + spinner borders
    height={5} // same as #nprogress .bar height
    crawl={true}
    crawlSpeed={200}
    speed={200}
    easing="ease"
    showSpinner={true}
    zIndex={1600}
    shadow="0 0 10px red, 0 0 5px red" // matches .peg blur
    template={`
    <div class="bar" role="bar">
      <div class="peg" style="
        width: 100px;
        height: 100%;
        position: absolute;
        right: 0;
        box-shadow: 0 0 10px red, 0 0 5px red;
        transform: rotate(3deg) translate(0px, -4px);
      "></div>
    </div>

    <div class="spinner" role="spinner" style="
      position: fixed;
      top: 15px;
      right: 15px;
      width: 18px;
      height: 18px;
      border: solid 2px transparent;
      border-top-color: red;
      border-left-color: red;
      border-radius: 50%;
      animation: nprogress-spinner 400ms linear infinite;
    ">
      <div class="spinner-icon"></div>
    </div>
  `}
  />
)
