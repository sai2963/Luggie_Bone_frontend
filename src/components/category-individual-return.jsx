const { Link } = require("react-router-dom");

function Category_Individual_Return({ ProductsData }) {
  const ProductsArray = Object.values(CategoriesData);
  return (
    <>
      {ProductsArray.map((item, index) => {
        <div>
          <div>
            <img
              src={
                (item.images && item.images[0]?.src) ||
                (item.variants && item.variants[0]?.featured_image?.src) ||
                "/fallback.jpg"
              }
              alt={item.title || `Product ${index + 1}`}
            />
          </div>
          <div>{item.title || `Product ${index + 1}`}</div>
          <div>
            <div>
              <span>
                $
                {(item.variants &&
                  parseFloat(item.variants[0]?.price || "0").toFixed(2)) ||
                  "0.00"}
              </span>
            </div>
            <div>
              <Link to={`/${item.id || index}`}>View</Link>
            </div>
          </div>
        </div>;
      })}
    </>
  );
}
