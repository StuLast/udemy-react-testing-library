import './Filter.css';

const Filter = () => {
  return (
    <div className="pet-filter-container">

      <div className="filter-container">
        <label htmlFor="favourite">favourite</label>
        <select
          className="form-select"
          name="favourite"
          id="favourite"
          defaultValue="any"
        >
          <option value="any">Any</option>
          <option value="favourite">Favourite</option>
          <option value="not favourite">Not Favourite</option>
        </select>
      </div>

      <div className="filter-container">
        <label htmlFor="gender">gender</label>
        <select
          className="form-select"
          name="gender"
          id="gender"
          defaultValue="any"
        >
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  )
};

export default Filter;