import React, {ReactElement} from 'react';
import clsx from 'clsx';

// MUI Icons
import StorefrontIcon from '@material-ui/icons/Storefront';

// styles
import './style.scss';

// interface
interface IProps {
  addClass?: string;
}

const Logo = (props: IProps): ReactElement => {
  // variables
  const {addClass} = props;

  return (
    <div className={clsx('logo', addClass)}>
      <h1>
        <StorefrontIcon />
        Merchant
      </h1>
    </div>
  );
};

export default Logo;
