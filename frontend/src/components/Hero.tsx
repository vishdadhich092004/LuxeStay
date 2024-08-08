function Hero() {
  return (
    <div className="bg-yellow-800 py-12 md:py-16 lg:py-20 xl:py-24 px-4">
      <div className="container mx-auto flex flex-col gap-4 md:gap-6">
        <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight text-center md:text-left">
          Comfort and Luxury <br className="block md:hidden" /> at Your
          Fingertips
        </h1>
        <p className="text-xl md:text-2xl text-white text-center md:text-left">
          Access the finest hotels with just a few clicks...
        </p>
      </div>
    </div>
  );
}
export default Hero;
