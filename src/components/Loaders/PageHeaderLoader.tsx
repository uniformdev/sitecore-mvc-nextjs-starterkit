export const PageHeaderLoader = () => (
  <>
    <div className="carousel"></div>
    <style jsx>{`
      .carousel:empty {
        min-height: 525px;
        background: linear-gradient(-45deg, #2e384e, #2e384e, #4e586d, #7f879c);
        background-size: 400% 400%;
        animation: gradient 3s ease infinite;
      }

      @media only screen and (max-width: 600px) {
        .carousel:empty {
          min-height: 200px;
        }
      }

      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    `}</style>
  </>
);
export default PageHeaderLoader;
