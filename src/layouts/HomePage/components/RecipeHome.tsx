import { RecipeModel } from '../../../models/RecipeModel';

type RecipeProps = {
  recipe: RecipeModel;
};

export const RecipeHome = ({ recipe }: RecipeProps) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <div
          style={{
            height: '200px',
            width: '200px',
            overflow: 'hidden',
            borderRadius: '50%',
            border: 'rgb(6, 63, 47) solid .2rem',
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
      </div>
    </div>
  );
};
