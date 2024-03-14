import Input from "@/components/html/Input";
import Autocomplete from "@/components/html/Autocomplete";
import { CiSearch } from "react-icons/ci";
import { locations } from "@/app/data";

const SearchSideBar = (props) => {
  return (
    <div className="col-span-1">
      <div className="sticky top-28 bg-[#f5f7fc] rounded-md p-7 text-slate-700">
        <div className="font-semibold mb-2 ml-0.5">Търси по ключова дума</div>

        <Input
          type="text"
          bgWhite={true}
          placeholder="Заглавие, фирма, ключова дума"
          startContentIcon={
            <CiSearch className="size-5 text-black/50 text-slate-400 pointer-events-none flex-shrink-0" />
          }
          // onChange={(value) => handleInputChange("email", value)}
        />

        <div className="font-semibold mb-2 ml-0.5 mt-8">Локация</div>

        <Autocomplete
          items={locations}
          bgWhite={true}
          label="Избери град"
          startContentIcon={
            <CiSearch className="size-5 text-black/50 text-slate-400 pointer-events-none flex-shrink-0" />
          }
          // onChange={(value) => handleInputChange("email", value)}
        />
      </div>
    </div>
  );
};

export default SearchSideBar;
