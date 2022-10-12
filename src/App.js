import { Countdown } from './Countdown';
import moment from 'moment';
import { useMemo } from 'react';

const getNextBiweeklyTime = ({ now, inOddWeek, dayOfWeek, hour, minute = 0, second = 0 }) => {
  const isOddWeek = now.week() % 2 === 1
  const nextDayOfWeek = isOddWeek ^ inOddWeek ? dayOfWeek + 7 : dayOfWeek
  const result = now.clone().day(nextDayOfWeek).hour(hour).minute(minute).second(second)
  if (now > result) result.add(14, 'days')
  return result
}

const getSignoff = (now) => getNextBiweeklyTime({
  now,
  inOddWeek: false,
  dayOfWeek: 2,
  hour: 12,
})

const getEndOfSprint = (now) => getNextBiweeklyTime({
  now,
  inOddWeek: false,
  dayOfWeek: 2,
  hour: 18,
})

const getCodeFreeze = (now) => getNextBiweeklyTime({
  now,
  inOddWeek: true,
  dayOfWeek: 5,
  hour: 0,
})

const getRelease = (now) => getNextBiweeklyTime({
  now,
  inOddWeek: true,
  dayOfWeek: 0,
  hour: 21,
})

export default function App() {
  const now = useMemo(() => moment(), [])
  const signoff = useMemo(() => getSignoff(now), [now])
  const endsprint = useMemo(() => getEndOfSprint(now), [now])
  const codefreeze = useMemo(() => getCodeFreeze(now), [now])
  const release = useMemo(() => getRelease(now), [now])

  return (
    <>
      <h3>Next Scheduled QA Signoff: {signoff.toString()}</h3>
      <Countdown remainingTimeInSeconds={signoff.unix() - now.unix()} />
      <h3>Next End of Sprint: {endsprint.toString()}</h3>
      <Countdown remainingTimeInSeconds={endsprint.unix() - now.unix()} />
      <h3>Next Code Freeze: {codefreeze.toString()}</h3>
      <Countdown remainingTimeInSeconds={codefreeze.unix() - now.unix()} />
      <h3>Next Release Day: {release.toString()}</h3>
      <Countdown remainingTimeInSeconds={release.unix() - now.unix()} />
    </>
  );
}
