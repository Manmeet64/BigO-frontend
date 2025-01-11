import Navbar from "../components/Navbar";

const Battles = () => {
  return (
    <section className="flex flex-row items-center justify-center h-screen bg-cover bg-center">
      {/* Navbar */}
      <Navbar />

      <div
        className="relative flex flex-col items-center justify-center w-full h-full"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/24/5c/66/245c6684dd09c3240f72a35383185e30.jpg')",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-8xl sm:text-5xl lg:text-8xl font-bold mb-4 font-quantico">
            Friendly Battles
          </h1>
          <p className="text-xl sm:text-2xl font-quantico">
            Challenge your friends to a flashcard showoff
          </p>

          <p className="text-lg font-quantico">Coming soon!</p>
        </div>
      </div>
    </section>
  );
};

export default Battles;
