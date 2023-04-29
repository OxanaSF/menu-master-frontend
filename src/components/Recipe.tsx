import { RecipeModel } from "../models/RecipeModel"; 

type RecipeProps = {
  recipe: RecipeModel;
};

export const Recipe = ({ recipe }: RecipeProps) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <div
          style={{
            height: '150px',
            overflow: 'hidden',
          }}
        >
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
        <h6 className="mt-2" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
          {recipe.name}
        </h6>
        {/* <p>{recipe.instructions}</p> */}
        <a className="btn main-color text-white" href="#">
          Save
        </a>
      </div>
    </div>
  );
};
