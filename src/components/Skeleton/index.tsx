import React from 'react';
import { default as CustomSkeleton } from '@mui/material/Skeleton';

export enum SkeletonVariant {
  RECORD_LIST = 'record-list',
}

export interface SkeletonProps {
  variant: SkeletonVariant;
  numberOfItems?: number;
  className?: string;
}

export const Skeleton = ({
  variant = SkeletonVariant.RECORD_LIST,
  numberOfItems = 10,
  className = '',
}: SkeletonProps) => {
  return (
    <>
      {variant === SkeletonVariant.RECORD_LIST && (
        <div className={`tw-w-full ${className}`}>
          {[...Array(numberOfItems)].map((_, index) => (
            <div key={index} className="tw-mb-0.5">
              <CustomSkeleton variant="rectangular" height={88} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
