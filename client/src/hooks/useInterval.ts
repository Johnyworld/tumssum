import { useEffect, useRef } from "react";

export default (cb: Function, delay: number) => {

	const savedCallback = useRef<Function>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = cb;
  }, [cb]);

  // Set up the interval.
  useEffect(() => {
		if (savedCallback.current) {
			const tick = () => {
				savedCallback.current!();
			}
			if (delay !== null) {
				let id = setInterval(tick, delay);
				return () => clearInterval(id);
			}
		}
  }, [delay]);
}
