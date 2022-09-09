import Skeleton from '@mui/material/Skeleton';

export const BikeDetailSkeleton = () => {
  return (
    <>
      <Skeleton variant="text" width={320} height={50} />
      <section className="container-2-col">
        <Skeleton variant="rounded" width={320} height={240} />
        <div>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <Skeleton variant="text" width={320} height={50} key={index} />
          ))}
        </div>
      </section>
    </>
  );
};
