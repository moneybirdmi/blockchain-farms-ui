import { Link } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
const ActiveNode = (props) => {
  const kovanurl = 'https://kovan.etherscan.io';
  const mainnet = 'https://etherscan.io';
  return (
    <div className='col-4'>
      <div className='node-card'>
        <h4>Node {props.nodeNumber}</h4>
        <span className='badge'>Active</span>
        <div className='address'>
          <span>Address</span>
          <p>
            <Link
              target='_blank'
              href={`${kovanurl}/address/${props.nodeAddress}`}
            >
              {props.nodeAddress}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActiveNode;
