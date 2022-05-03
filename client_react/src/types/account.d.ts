declare module 'types' {
  interface GrabbingData<T> {
    itemPos: Vec2; // 아이템 기존 위치
    clickPos: Vec2; // 드래그 시작 위치 (마우스 찍은 위치)
    width: number;
    height: number;
    data: T;
  }

  interface Account {
    id: number;
    title: string;
    account?: number;
    /** 타 뱅크로 전송 */
    to?: number;
    datetime: string;
    location?: string;
    memo?: string;
    user: number;
    month?: number;
    category_title?: string;
    category?: number;
    bank?: number;
    bank_title?: string;
    created_at: string;
    updated_at: string;
  }
}
