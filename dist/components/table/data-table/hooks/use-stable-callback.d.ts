/**
 * 외부 콜백을 ref 로 흡수해 안정적인 reference 를 반환.
 *
 * 사용처에서 inline arrow function (`onClick={() => ...}`) 으로 매 render 마다 새 함수를
 * 넘겨도 내부에서 ref 로 가로채 항상 같은 함수 ref 를 반환한다.
 * 이를 통해 row ctx 안정성 (React.memo skip) 이 사용처 메모이즈 여부와 무관하게 보장된다.
 *
 * - render 중 동기 업데이트 (`ref.current = cb`) 로 stale closure 방지.
 *   useEffect 로 업데이트하면 render 중 호출되는 콜백 (rowClassName 등) 에서 stale 발생.
 * - cb 가 undefined / defined 사이를 오가면 ctx ref 가 갈리지만, 일반적으로 마운트 후엔
 *   항상 정의되어 있거나 항상 undefined 이므로 실무상 stable.
 */
export declare function useStableCallback<T extends (...args: never[]) => unknown>(cb: T | undefined): T | undefined;
