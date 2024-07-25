import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import { useDispatch } from "react-redux";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { addActive } from "../features/mapSlice";

const PlacesAutocomplete = ({ setSelected, placeholder }) => {
  const dispatch = useDispatch();
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    dispatch(addActive(false));
  };

  return (
    <div className="mb-2">
      <Combobox onSelect={handleSelect}>
        <h2 className="mb-1 text-sm font-medium text-slate-800">
          {placeholder}
        </h2>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="border border-solid  text-[.875rem] pr-20 pl-2 py-1.5 border-1 outline-none rounded-[4px]  border-slate-400 focus:border-blue-600 focus:border-2 bg-[#ffffff] text-[#333239]"
          placeholder="Select..."
        />

        <ComboboxPopover className="border border-solid rounded-md bg-[#374151] ">
          <ComboboxList className="bg-[#ffffff] rounded-md text-[#333239] ">
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption
                  key={place_id}
                  value={description}
                  className="hover:bg-slate-100"
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default PlacesAutocomplete;
