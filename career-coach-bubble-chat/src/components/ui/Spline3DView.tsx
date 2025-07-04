import Spline from '@splinetool/react-spline';

const Spline3DView = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 0,
      pointerEvents: "none", // taki click block na ho
    }}
    >

        <Spline scene="https://prod.spline.design/pVUgOA1xHiCOhWd2/scene.splinecode" />
    </div>
);

export default Spline3DView;