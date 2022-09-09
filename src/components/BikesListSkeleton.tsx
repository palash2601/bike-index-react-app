import Skeleton from '@mui/material/Skeleton';

export const BikesListSkeleton = () => {
  return (
    <section data-testid="loading">
      {[1, 2, 3, 4, 5].map((item, index) => (
        <div className="bike-card" key={index}>
          <Skeleton variant="rounded" height={190} />
        </div>
      ))}
    </section>
  );
};
