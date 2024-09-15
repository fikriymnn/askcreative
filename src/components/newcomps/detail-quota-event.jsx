'use client'
import React, {useEffect} from 'react'

function DetailQuotaEvent({capacities, quota}) {
  useEffect
    const registered = capacities - quota;
  return (

    <div className="flex-flex-col">
        <div>Capacity: {capacities}</div>
        <div>Available: {quota}</div>
        <div>Registered: {registered}</div>
    </div>
  );
}

export default DetailQuotaEvent
