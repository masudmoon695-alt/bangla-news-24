import Image from "next/image";
import NavLinks from "./NavLinks";
import USerInfo from "./USerInfo";

const Header = async () => {
  "use cache";

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header>
      <div className="grid grid-cols-3 items-center container mx-auto px-4 py-3">
        {/* Left: balance er jonno khali */}
        <div></div>

        {/* Center: logo + title */}
        <div className="flex items-center justify-center gap-2">
          <Image
            className="w-10 h-10"
            height={50}
            width={50}
            src="/logo.webp"
            alt="logo"
          />
          <div>
            <h2>Bangla News 24</h2>
            <p>{date}</p>
          </div>
        </div>

        {/* Right: buttons */}
        <USerInfo/>
      </div>

      {/* Nav links header er niche */}
      <NavLinks />
    </header>
  );
};

export default Header;