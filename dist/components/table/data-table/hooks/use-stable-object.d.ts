/**
 * 사용자 prop 으로 받은 작은 객체를 deep compare 후 같은 내용이면 이전 ref 를 유지.
 * 사용처가 inline 으로 `{ groupBy: "region" }` 같은 객체를 매 render 마다 새로 만들어도
 * 내용이 같으면 stable ref 로 흡수해 ctx 무효화를 막는다.
 *
 * 비교 방식: 1-depth shallow + 배열 한 단계.
 * - 함수 prop 이 있는 객체 (rowActions 등) 는 매번 새 ref 일 가능성이 커서 부적합.
 *   → 그런 객체는 함수만 따로 useStableCallback 으로 흡수하고, 객체 자체는 ctx 에 안 넣음.
 */
export declare function useStableObject<T>(value: T): T;
