function Footer() {
  return (
    <div className="bg-yellow-800 py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-2xl md:text-3xl text-white font-bold tracking-tighter">
          LuxeStay.com
        </span>
        <span className="text-white font-bold tracking-tighter flex gap-4">
          <p className="cursor-pointer hover:underline">Privacy Policy</p>
          <p className="cursor-pointer hover:underline">Terms of Service</p>
        </span>
      </div>
    </div>
  );
}
export default Footer;
