function Footer() {
  return (
    <div className="bg-yellow-800 py-8">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tighter">
          LuxeStay.com
        </span>
        <span className=" text-white font-bold tracking-tighter flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Services</p>
          <p></p>
        </span>
      </div>
    </div>
  );
}
export default Footer;
