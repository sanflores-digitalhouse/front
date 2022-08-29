import React from 'react';
import { SvgDigitalHouse } from './icons/DigitalHouse';

export type IconType = 'digital-house';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  type: IconType;
}

const icons: Record<
  IconType,
  (props: React.SVGProps<SVGSVGElement>) => JSX.Element
> = {
  'digital-house': (props) => <SvgDigitalHouse role="img" {...props} />
};

export const Icon = ({ type, ...restProps }: IconProps): JSX.Element | null => {
  const icon = icons[type];
  if (icon) {
    return icon(restProps);
  }
  return null;
};