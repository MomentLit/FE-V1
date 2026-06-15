const spaceStats = [
  {
    label: "운영 중 공간",
    value: "04",
    detail: "이번 주 신규 저장 128회",
    featured: true,
  },
  {
    label: "예정된 팝업",
    value: "07",
    detail: "가장 가까운 일정 5월 18일",
  },
  {
    label: "새 문의",
    value: "12",
    detail: "답변 대기 3건",
  },
];

const spaces = [
  {
    title: "성수 쇼룸 A",
    description: "브랜드 팝업 · 서울 성동구 · 최대 80명",
    status: "운영 중",
    detail: "다음 예약 가능일 5월 14일 · 최근 문의 4건",
    action: "수정하기",
  },
  {
    title: "연남 팝업 라운지",
    description: "단기 행사 공간 · 서울 마포구 · 최대 45명",
    status: "검수 중",
    detail: "대표 이미지 교체 요청 반영 중 · 승인 대기 1건",
    action: "상세 관리",
  },
  {
    title: "한남 브랜드 전시 팝업",
    description: "예정된 팝업 · 서울 용산구 · 2026.05.22 - 2026.06.03",
    status: "모집 중",
    detail: "관심 저장 342회 · 공유 클릭 57회 · 문의 7건",
    action: "수정하기",
  },
];

function getStatusClass(status: string) {
  switch (status) {
    case "운영 중":
      return "bg-[#E8F6F7] text-[#008992]";
    case "검수 중":
      return "bg-[#FFF4DE] text-[#C88700]";
    case "모집 중":
      return "bg-[#EAF7EA] text-[#2D8A57]";
    default:
      return "bg-[#F1F5F6] text-[#4F5D73]";
  }
}

export function MySpaces() {
  return (
    <section className="flex w-[932px] flex-col gap-6">
      <div className="flex flex-col gap-2.5 pb-1">
        <p className="text-[12px] font-medium text-[#00ADB5]">
          MOMENTLIT MY PAGE
        </p>
        <h2 className="text-[42px] font-bold text-[#222831]">
          나의 공간 및 팝업
        </h2>
      </div>

      <section className="flex flex-col gap-6 rounded-[30px] bg-white p-7">
        <h3 className="text-[30px] font-bold text-[#222831]">
          등록된 공간 &amp; 팝업
        </h3>
        <p className="text-[15px] font-medium text-[#5E687E]">
          운영 중인 공간과 예정된 팝업 일정을 한 카드 안에서 확인하고, 수정이나
          노출 관리까지 바로 이어질 수 있도록 구성했습니다.
        </p>

        <div className="flex gap-4">
          {spaceStats.map(({ detail, featured, label, value }) => (
            <article
              className={`flex w-[260px] flex-col gap-2 rounded-3xl p-[22px] ${
                featured ? "bg-[#EEF8F8]" : "bg-[#F7FBFB]"
              }`}
              key={label}
            >
              <p className="text-[14px] font-semibold text-[#5E687E]">
                {label}
              </p>
              <strong className="text-[34px] font-bold text-[#222831]">
                {value}
              </strong>
              <p className="text-[13px] font-medium text-[#00ADB5]">
                {detail}
              </p>
            </article>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <h4 className="text-[24px] font-bold text-[#222831]">
            내 공간 리스트
          </h4>
          <button
            className="rounded-full bg-[#E8F6F7] px-4 py-2.5 text-[13px] font-bold text-[#008992]"
            type="button"
          >
            새 공간 등록
          </button>
        </div>

        <div className="flex flex-col gap-3.5">
          {spaces.map(({ action, description, detail, status, title }) => (
            <article
              className="flex flex-col gap-3 rounded-3xl border border-[#DDEEEF] bg-[#F8FBFB] p-[22px]"
              key={title}
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1.5">
                  <h5 className="text-[22px] font-bold text-[#222831]">
                    {title}
                  </h5>
                  <p className="text-[14px] font-medium text-[#5E687E]">
                    {description}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3.5 py-2 text-[13px] font-bold ${getStatusClass(status)}`}
                >
                  {status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[14px] font-medium text-[#5E687E]">
                  {detail}
                </p>
                <div className="flex gap-2.5">
                  <button
                    className="rounded-full bg-[#F1F5F6] px-4 py-2.5 text-[13px] font-bold text-[#4F5D73]"
                    type="button"
                  >
                    삭제하기
                  </button>
                  <button
                    className="rounded-full bg-[#00ADB5] px-4 py-2.5 text-[13px] font-bold text-white"
                    type="button"
                  >
                    {action}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
