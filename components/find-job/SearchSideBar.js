import Input from "@/components/html/Input";
import Autocomplete from "@/components/html/Autocomplete";
import { observer } from "mobx-react-lite";
import { CiSearch, CiLocationOn, CiBoxList, CiUser } from "react-icons/ci";
import { locations, dashboardCategories, workPositions } from "@/app/data";
import { adStore } from "@/stores/useStore";

const SearchSideBar = () => {
  const { setAdvancedSearchData, advancedSearchData } = adStore;

  const handleInputChange = (name, value) => {
    setAdvancedSearchData({ ...advancedSearchData, [name]: value });
  };

  return (
    <>
      <div className='font-semibold mb-2 ml-0.5'>Търси по ключова дума</div>

      <Input
        type='text'
        bgWhite={true}
        placeholder='Заглавие, фирма, ключова дума'
        value={advancedSearchData.keyword}
        startContentIcon={
          <CiSearch className='size-5 text-black/50 text-slate-400 pointer-events-none flex-shrink-0' />
        }
        onClear={() => handleInputChange("keyword", "")}
        onChange={(value) => handleInputChange("keyword", value)}
      />

      <div className='font-semibold mb-2 ml-0.5 mt-7'>Локация</div>

      <Autocomplete
        items={locations}
        bgWhite={true}
        value={advancedSearchData.location || ""}
        placeholder='Избери град'
        startContentIcon={
          <CiLocationOn className='size-5 text-black/50 text-slate-400 pointer-events-none flex-shrink-0' />
        }
        onChange={(value) => handleInputChange("location", value)}
      />

      <div className='font-semibold mb-2 ml-0.5 mt-7'>Работна позиция</div>

      <Autocomplete
        items={workPositions}
        bgWhite={true}
        placeholder='Избери позиция'
        startContentIcon={
          <CiUser className='size-5 text-black/50 text-slate-400 pointer-events-none flex-shrink-0' />
        }
        onChange={(value) => handleInputChange("position", value)}
      />

      <div className='font-semibold mb-2 ml-0.5 mt-7'>Категория</div>

      <Autocomplete
        items={dashboardCategories}
        bgWhite={true}
        value={advancedSearchData.category || ""}
        placeholder='Избери категория'
        startContentIcon={
          <CiBoxList className='size-5 text-black/50 text-slate-400 pointer-events-none flex-shrink-0' />
        }
        onChange={(value) => handleInputChange("category", value)}
      />
    </>
  );
};

export default observer(SearchSideBar);
