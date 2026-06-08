import Image from "next/image";
import { Header } from "@/components/Header";

const photos = [
  "https://images.unsplash.com/photo-1759730840961-09faa5731a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzgxMTA0OTd8&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1671521867046-e6d7ad644094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzgxMTA0OTh8&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1774021802030-d4b48399232d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzgxMTA0OTh8&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1771402382398-7210f67eb41b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzgxMTA0OTl8&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1774384412702-970b89bae264?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzgxMTA1MDB8&ixlib=rb-4.1.0&q=80&w=1080",
];

const meta = ["서울 성수동", "최대 120명", "브랜드 팝업 · 전시 · 촬영"];

const calendarRows = [
  [
    ["1", "muted"],
    ["2", "muted"],
    ["3", "muted"],
    ["4", "muted"],
    ["5", ""],
    ["6", ""],
    ["7", ""],
  ],
  [["8", ""], ["9", ""], ["10", ""], ["11", ""], ["12", ""], ["13", ""], ["14", ""]],
  [["15", ""], ["16", ""], ["17", "active"], ["18", ""], ["19", ""], ["20", "closed"], ["21", ""]],
  [["22", ""], ["23", ""], ["24", ""], ["25", "active"], ["26", ""], ["27", ""], ["28", "closed"]],
  [["25", ""], ["26", ""], ["27", ""], ["28", ""], ["29", ""], ["30", ""], ["31", ""]],
];

function CalendarDay({ state, value }: { state: string; value: string }) {
  const stateClass =
    state === "active"
      ? "bg-[#E8F6F7] font-bold text-[#00ADB5]"
      : state === "closed"
        ? "bg-[#F0F3F6] text-[#99A1B1]"
        : state === "muted"
          ? "bg-white text-[#99A1B1]"
          : "bg-white text-[#222831]";

  return (
    <span className={`grid h-10 w-10 place-items-center rounded-[12px] text-[14px] font-semibold ${stateClass}`}>
      {value}
    </span>
  );
}

function FooterMark() {
  return (
    <svg aria-hidden="true" className="h-[60px] w-[50px]" fill="none" viewBox="0 0 50 60">
      <rect x="0" y="0" width="8.93" height="20.39" rx="4.46" fill="#D3D3D3" />
      <rect x="10.48" y="15.61" width="8.94" height="34.88" rx="4.47" fill="#FFFFFF" />
      <rect x="24.68" y="17.77" width="9.3" height="42.1" rx="4.65" fill="#D3D3D3" />
      <rect x="29.91" y="15.72" width="8.94" height="34.88" rx="4.47" fill="#FFFFFF" />
      <rect x="34.67" y="5.36" width="9.09" height="26.57" rx="4.54" fill="#D3D3D3" />
      <circle cx="44.88" cy="11.27" r="4.26" fill="#D3D3D3" />
    </svg>
  );
}

function HostFooter() {
  return (
    <footer className="mt-[88px] h-[360px] bg-[#222831] text-white">
      <div className="mx-auto flex w-[1280px] gap-[220px] pt-[72px]">
        <div className="w-[817px]">
          <div className="flex items-center gap-3">
            <h2 className="text-[32px] font-normal text-white">MomentLIt</h2>
            <FooterMark />
          </div>
          <div className="mt-8 flex flex-col gap-3 text-[18px] font-medium text-[#D0D3DB]">
            <p>주소: 부산광역시 강서구 가락대로 1393 (46708)</p>
            <p className="w-[360px]">이메일: momentlit@exam.com</p>
          </div>
          <p className="mt-7 w-[420px] text-[16px] font-medium text-[#B9BEC9]">
            도시의 팝업과 전시를 가장 빠르게 발견하는 큐레이션 플랫폼
          </p>
        </div>

        <div className="flex w-[243px] flex-col gap-10">
          <nav className="flex flex-col gap-5 text-[18px]">
            <span className="font-bold text-[#EEEEEE]">홈</span>
            <span className="font-medium text-[#D0D3DB]">공간 찾기</span>
            <span className="font-medium text-[#D0D3DB]">캘린더</span>
            <span className="font-medium text-[#D0D3DB]">AI 공간 매칭</span>
          </nav>
          <div className="flex flex-wrap gap-2">
            {["Instagram", "Contact", "Partnership"].map((tag) => (
              <span className="rounded-full bg-white/[0.07] px-4 py-2 text-[13px] font-semibold text-white" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function SpaceDetailPage() {
  return (
    <div
      className="min-h-screen bg-[#F8FBFB] text-[#222831]"
      id="top"
    >
      <Header />

      <main className="mx-auto mt-8 flex w-[1180px] flex-col gap-11">
        <section className="flex scroll-mt-8 gap-9" id="space-search">
          <div className="flex w-[740px] flex-col gap-5">
            <div className="relative h-[500px] w-[740px] overflow-hidden rounded-[28px]">
              <Image src={photos[0]} alt="" fill priority sizes="740px" className="object-cover" />
            </div>

            <div className="flex gap-3">
              {photos.slice(1).map((photo) => (
                <div className="relative h-[118px] w-44 overflow-hidden rounded-[18px]" key={photo}>
                  <Image src={photo} alt="" fill sizes="176px" className="object-cover" />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3.5">
              <p className="text-[14px] font-bold text-[#00ADB5]">HOST SPACE</p>
              <h1 className="w-[676px] text-[38px] font-bold leading-[1.2] text-[#222831]">
                성수 브랜드 팝업 전용 쇼룸
              </h1>
              <div className="flex gap-2">
                {meta.map((item, index) => (
                  <span
                    className={`rounded-full px-4 py-2 text-[14px] ${
                      index === 0
                        ? "bg-[#E8F6F7] font-bold text-[#00ADB5]"
                        : "bg-[#F0F3F6] font-semibold text-[#5E687E]"
                    }`}
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="flex w-[404px] flex-col gap-[18px]">
            <section
              className="flex scroll-mt-8 flex-col gap-3.5 rounded-[28px] bg-white p-5"
              id="calendar"
            >
              <h2 className="text-[24px] font-bold text-[#222831]">일정</h2>
              <div className="flex flex-col gap-4 rounded-[22px] bg-[#F8FBFB] p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[20px] font-bold text-[#222831]">2026년 5월</h3>
                  <div className="flex gap-2">
                    <button className="grid h-8 w-8 place-items-center rounded-full bg-white text-[16px] font-bold text-[#67728A]" type="button">
                      {"<"}
                    </button>
                    <button className="grid h-8 w-8 place-items-center rounded-full bg-white text-[16px] font-bold text-[#67728A]" type="button">
                      {">"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-[14px]">
                  {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                    <span className="grid h-8 w-10 place-items-center rounded-[12px] bg-white text-[10px] font-bold text-[#67728A]" key={day}>
                      {day}
                    </span>
                  ))}
                  {calendarRows.flat().map(([value, state], index) => (
                    <CalendarDay key={`${value}-${index}`} state={state} value={value} />
                  ))}
                </div>

                <div className="flex gap-5">
                  <span className="flex items-center gap-2 text-[13px] font-medium text-[#5E687E]">
                    <i className="h-2.5 w-2.5 rounded-full bg-[#00ADB5]" />
                    예약 가능
                  </span>
                  <span className="flex items-center gap-2 text-[13px] font-medium text-[#5E687E]">
                    <i className="h-2.5 w-2.5 rounded-full bg-[#D0D3DB]" />
                    마감/휴무
                  </span>
                </div>
              </div>
            </section>

            <button
              className="grid rounded-[18px] bg-[#00ADB5] px-[18px] py-4 text-center text-[20px] font-bold text-white"
              id="contact"
              type="button"
            >
              문의하기 · 채팅 연결
            </button>

            <section className="flex flex-col gap-3.5 rounded-[28px] bg-white p-5">
              <h2 className="text-[24px] font-bold text-[#222831]">공간 정보</h2>
              <p className="w-[300px] whitespace-pre-line text-[16px] font-medium leading-[1.85] text-[#5E687E]">
                {"주소  서울 성동구 연무장길 00\n전화  010-1234-5678\n인스타그램  @moment_space\n블로그  blog.naver.com/moment_space\n운영시간  11:00 - 22:00"}
              </p>
            </section>
          </aside>
        </section>

        <section className="flex flex-col gap-[18px] rounded-[30px] bg-white px-8 py-7">
          <h2 className="text-[30px] font-bold text-[#222831]">공간 소개</h2>
          <p className="w-[1116px] text-[18px] font-medium leading-[1.75] text-[#5E687E]">
            브랜드 런칭 행사, 시즌 팝업, 전시형 쇼케이스까지 유연하게 운영할 수 있는 성수 중심 공간입니다. 높은 층고와 넓은 전면 유리 덕분에 낮에는 개방감이 좋고, 저녁에는 조명 연출이 깔끔하게 살아납니다.
          </p>
        </section>

        <section
          className="flex scroll-mt-8 flex-col gap-[18px] rounded-[30px] bg-[#E8F6F7] px-8 py-7"
          id="ai-match"
        >
          <h2 className="text-[30px] font-bold text-[#222831]">AI 공간 요약</h2>
          <p className="w-[1116px] text-[18px] font-medium leading-[1.75] text-[#4F5D73]">
            이 공간은 브랜드 팝업과 소규모 전시에 특히 적합해요. 유동 인구가 많은 성수 메인 동선에 있고, 외부 노출이 좋아 신상품 공개나 체험형 이벤트 운영에 강점이 있습니다. 예약 전에는 주말 피크 타임과 반입 동선을 꼭 확인해보는 것을 추천합니다.
          </p>
        </section>
      </main>

      <HostFooter />
    </div>
  );
}
