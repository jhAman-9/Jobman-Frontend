import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWork from "./HowItWork";
import PopolarCotegories from "./PopolarCotegories";
import PopularCompanies from "./PopularCompanies";

const Home = () => {
  const { autherized } = useSelector((store) => store.user);
  // const dispatch = useDispatch();

  if (!autherized) return <Navigate to={"/login"} />;
  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowItWork />
        <PopolarCotegories />
        <PopularCompanies />
      </section>
    </>
  );
};

export default Home;
