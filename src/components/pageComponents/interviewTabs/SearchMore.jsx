import SearchBar from "../SearchBar";

const SearchMore = ({ authUserData }) => {
    return (
        <div className="w-full block">
            <SearchBar authUserData={authUserData} />
        </div>
    );
};

export default SearchMore;
