// FilterComponent: Handles the filter input
const FilterComponent = ({ newFilter, handleFilter }) => (
    <div>
        find countries: <br></br>
        <input value={newFilter} onChange={handleFilter}></input>
    </div>
)

export default FilterComponent