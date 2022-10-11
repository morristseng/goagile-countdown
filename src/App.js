import { Countdown } from './Countdown';
import moment from 'moment';
import { useMemo } from 'react';

const getSignoff = (now) => {
  const weeknum = now.week()
  const is_odd = weeknum % 2 === 1
  const signofftime = now.clone().day(is_odd ? 9 : 2).hour(12).minute(0).second(0)
  if (now > signofftime) {
    signofftime.add(14, 'days')
  }
  return signofftime
}

export default function App() {
  const now = useMemo(() => moment(), [])
  const signoff = useMemo(() => getSignoff(now), [now])

  return (
    <Countdown remainingTimeInSeconds={signoff.unix() - now.unix()} />
  );
}
