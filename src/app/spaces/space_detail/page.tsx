import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const galleryImages = [
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?fit=max&fm=jpg&q=80&w=1200",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?fit=max&fm=jpg&q=80&w=1200",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?fit=max&fm=jpg&q=80&w=1200",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?fit=max&fm=jpg&q=80&w=1200",
];

const introFeatures = [
  {
    title: "노출감 좋은 전면부",
    body: "메인 스트리트에 바로 면해 있어 브랜드 노출과 방문 동선이 잘 보입니다.",
  },
  {
    title: "운영 동선 분리",
    body: "전시, 판매, 대기 존을 나누기 쉬워서 행사 운영이 한결 편합니다.",
  },
  {
    title: "짧은 준비에도 적합",
    body: "단기 팝업이나 촬영 세팅처럼 빠르게 꾸려야 하는 일정에 잘 맞습니다.",
  },
];

const operationLeft = [
  ["기본 용도", "쇼룸형 공간"],
  ["추천 목적", "브랜드 팝업"],
  ["사용 가능", "전시 · 행사"],
];

const operationRight = [
  ["주차", "사전 문의"],
  ["반입 제한", "대형 장비 협의"],
  ["추가 옵션", "집기, 냉장고, 현수막"],
];

const relatedSpaces = [
  {
    image:
      "https://images.unsplash.com/photo-1759730840961-09faa5731a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "연남 크리에이티브 스페이스",
    meta: "서울 마포구 · 최대 45명",
    tags: ["쇼룸형 공간", "전시", "촬영"],
    views: "1.1k",
    likes: "72",
    price: "120만원 / 일",
    capacity: "잔여 일정 3개",
  },
  {
    image:
      "https://images.unsplash.com/photo-1671521867046-e6d7ad644094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "강남 브랜드 쇼룸 라운지",
    meta: "서울 강남구 · 최대 110명",
    tags: ["브랜드 행사", "전시 운영", "촬영 가능"],
    views: "864",
    likes: "49",
    price: "190만원 / 일",
    capacity: "잔여 일정 1개",
  },
  {
    image:
      "https://images.unsplash.com/photo-1774021802030-d4b48399232d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    title: "해운대 루프 이벤트홀",
    meta: "부산 해운대구 · 최대 90명",
    tags: ["행사", "루프탑", "대관 가능"],
    views: "1.4k",
    likes: "95",
    price: "170만원 / 일",
    capacity: "잔여 일정 2개",
  },
];

function StatRow({ views, likes }: { views: string; likes: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <span className="text-[16px] leading-none text-[#8A94A6]">👁</span>
        <span className="text-[14px] font-bold text-[#5E687E]">{views}</span>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="text-[14px] font-bold text-[#5E687E]">{likes}</span>
        <button
          className="grid h-[34px] w-[34px] place-items-center rounded-full border border-[#DDEEEF] bg-[#F8FBFB] text-[15px] font-bold text-[#FF6B81]"
          type="button"
        >
          ♡
        </button>
      </div>
    </div>
  );
}

function SummaryFact({
  description,
  label,
  value,
}: {
  description: string;
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-[20px] border border-[#DDEEEF] bg-white p-5">
      <p className="text-[13px] font-bold text-[#67728A]">{label}</p>
      <p className="mt-1 text-[24px] font-bold text-[#222831]">{value}</p>
      <p className="mt-1 text-[13px] font-medium leading-[1.4] text-[#67728A]">
        {description}
      </p>
    </article>
  );
}

function RelatedSpaceCard({
  capacity,
  image,
  likes,
  meta,
  price,
  tags,
  title,
  views,
}: {
  capacity: string;
  image: string;
  likes: string;
  meta: string;
  price: string;
  tags: string[];
  title: string;
  views: string;
}) {
  return (
    <article className="w-[405px] rounded-[24px] border border-[#DDEEEF] bg-white p-4">
      <div className="flex flex-col gap-3">
        <div className="relative h-[188px] w-full overflow-hidden rounded-[18px]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="405px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-[18px] font-bold leading-[1.34] text-[#222831]">
            {title}
          </h3>
          <p className="text-[13px] font-medium leading-[1.42] text-[#67728A]">
            {meta}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              className={`rounded-full px-[14px] py-[10px] text-[13px] font-bold ${
                index === 0
                  ? "border border-[#BFECEE] bg-[#E8F6F7] text-[#00ADB5]"
                  : "border border-[#DDEEEF] bg-[#F8FBFB] text-[#67728A]"
              }`}
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[16px] font-bold text-[#222831]">
              {price}
            </span>
            <span className="text-[12px] font-medium text-[#67728A]">
              {capacity}
            </span>
          </div>
          <StatRow views={views} likes={likes} />
        </div>
      </div>
    </article>
  );
}

export default function SpaceDetailPage() {
  return (
    <div className="min-h-screen bg-[#F8FBFB] text-[#222831]" id="top">
      <Header />

      <main className="mx-auto w-[1440px] px-20 pb-10 pt-7">
        <section className="mb-3 flex flex-col gap-3">
          <p className="text-[12px] font-bold text-[#00ADB5]">
            MOMENTLIT SPACE LISTING
          </p>
          <h1 className="text-[42px] font-bold leading-[1.4] text-[#222831]">
            성수 위켄드 쇼룸 공간
          </h1>
        </section>

        <section className="flex gap-6">
          <div className="flex w-[848px] flex-col gap-6">
            <div className="flex flex-col gap-3.5">
              <div className="relative h-[420px] overflow-hidden rounded-[28px]">
                <Image
                  src={galleryImages[0]}
                  alt="성수 위켄드 쇼룸 공간"
                  fill
                  priority
                  sizes="848px"
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-3.5">
                {galleryImages.slice(1).map((photo) => (
                  <div
                    className="relative h-[148px] overflow-hidden rounded-[22px]"
                    key={photo}
                  >
                    <Image
                      src={photo}
                      alt=""
                      fill
                      sizes="250px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <section className="rounded-[28px] border border-[#DDEEEF] bg-white p-7">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {["쇼룸형 공간", "전시 · 행사", "촬영 가능"].map((tag, index) => (
                    <span
                      className={`rounded-full px-[14px] py-[10px] text-[13px] font-bold ${
                        index === 0
                          ? "border border-[#BFECEE] bg-[#E8F6F7] text-[#00ADB5]"
                          : "border border-[#DDEEEF] bg-[#F8FBFB] text-[#67728A]"
                      }`}
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-[24px] font-bold text-[#222831]">
                  한눈에 보는 공간 정보
                </h2>
                <p className="text-[15px] font-medium leading-[1.4] text-[#67728A]">
                  전면 유리 파사드와 깊은 내부 동선을 갖춘 성수 메인 상권
                  공간입니다. 브랜드 행사, 전시, 촬영, 단기 쇼룸 운영에 활용하기
                  좋고 방문자 동선을 나누기 쉬운 구조를 갖추고 있습니다.
                </p>

                <div className="grid grid-cols-3 gap-3">
                  <SummaryFact
                    label="예약 가능 기간"
                    value="일 단위 협의"
                    description="단기 대관부터 주 단위 운영까지 일정에 맞춰 조율 가능"
                  />
                  <SummaryFact
                    label="적정 수용 인원"
                    value="80명"
                    description="행사 구성에 따라 체류형 배치와 회전형 운영 모두 가능"
                  />
                  <SummaryFact
                    label="대관 가격"
                    value="150만원 / 일"
                    description="옵션 구성과 이용 시간에 따라 세부 금액 협의 가능"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-[#DDEEEF] bg-white p-7">
              <h2 className="text-[24px] font-bold text-[#222831]">공간 소개</h2>
              <p className="mt-4 text-[15px] font-medium leading-[1.4] text-[#67728A]">
                성수 위켄드 쇼룸 공간은 패션, 라이프스타일, F&amp;B 브랜드가
                단기 행사나 전시를 열기 좋은 공간입니다. 외부 시야가 잘 열려 있고
                내부는 존 분리가 쉬워 쇼룸, 판매, 촬영, 체험형 운영을 한 공간 안에서
                유연하게 구성할 수 있습니다.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-3.5">
                {introFeatures.map((feature) => (
                  <article
                    className="rounded-[20px] border border-[#DDEEEF] bg-white p-5"
                    key={feature.title}
                  >
                    <h3 className="text-[18px] font-bold text-[#222831]">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-[14px] font-medium leading-[1.4] text-[#67728A]">
                      {feature.body}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-[#DDEEEF] bg-white p-7">
              <h2 className="text-[24px] font-bold text-[#222831]">운영 정보</h2>
              <div className="mt-5 grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-3">
                  {operationLeft.map(([label, value]) => (
                    <div className="flex items-center justify-between" key={label}>
                      <span className="text-[14px] font-bold text-[#67728A]">
                        {label}
                      </span>
                      <span className="text-[14px] font-semibold text-[#222831]">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  {operationRight.map(([label, value]) => (
                    <div className="flex items-center justify-between" key={label}>
                      <span className="text-[14px] font-bold text-[#67728A]">
                        {label}
                      </span>
                      <span className="text-[14px] font-semibold text-[#222831]">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>

          <aside className="flex w-[408px] flex-col gap-5">
            <section className="flex flex-col gap-[18px] rounded-[28px] border border-[#DDEEEF] bg-white p-6">
              <StatRow views="2.3k" likes="318" />

              <h2 className="text-[34px] font-bold leading-[1.4] text-[#222831]">
                150만원 / 일
              </h2>

              <div className="flex flex-col gap-2 rounded-[20px] border border-[#DDEEEF] bg-[#F8FBFB] p-[18px]">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-bold text-[#67728A]">
                    예약 가능
                  </span>
                  <span className="text-[14px] font-semibold text-[#222831]">
                    6월 21일 - 7월 5일
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-bold text-[#67728A]">
                    최소 이용
                  </span>
                  <span className="text-[14px] font-semibold text-[#222831]">
                    3일
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-bold text-[#67728A]">
                    상태
                  </span>
                  <span className="text-[14px] font-semibold text-[#222831]">
                    판매중
                  </span>
                </div>
              </div>

              <button
                className="grid rounded-[16px] bg-[#222831] px-4 py-[14px] text-[15px] font-bold text-white"
                type="button"
              >
                공간 문의하기
              </button>

              <div className="rounded-[20px] bg-[#F8FBFB] p-[18px]">
                <p className="text-[13px] font-bold text-[#67728A]">
                  공간 등록자
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-[#CFECEE]" />
                  <div className="flex flex-col gap-1">
                    <p className="text-[16px] font-bold text-[#222831]">
                      성수동 위켄드 팀
                    </p>
                    <p className="text-[13px] font-medium text-[#67728A]">
                      응답 평균 1시간 이내
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-[12px] rounded-[28px] border border-[#DDEEEF] bg-white p-[18px]">
              <h3 className="text-[24px] font-bold text-[#222831]">
                예약 가능 일정
              </h3>
              <div className="rounded-[22px] bg-[#F8FBFB] p-[18px]">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-[20px] font-bold text-[#222831]">
                    2026년 5월
                  </h4>
                  <div className="flex gap-2">
                    <button
                      className="grid h-8 w-8 place-items-center rounded-full bg-white text-[16px] font-bold text-[#67728A]"
                      type="button"
                    >
                      {"<"}
                    </button>
                    <button
                      className="grid h-8 w-8 place-items-center rounded-full bg-white text-[16px] font-bold text-[#67728A]"
                      type="button"
                    >
                      {">"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-[5px]">
                  {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                    (day) => (
                      <span
                        className="grid h-[46px] place-items-center rounded-[14px] text-[11px] font-bold text-[#7C8799]"
                        key={day}
                      >
                        {day}
                      </span>
                    ),
                  )}
                  {[
                    ["1", "muted"],
                    ["2", "active"],
                    ["3", ""],
                    ["4", ""],
                    ["5", ""],
                    ["6", ""],
                    ["7", ""],
                    ["8", ""],
                    ["9", "active"],
                    ["10", ""],
                    ["11", "closed"],
                    ["12", "active"],
                    ["13", ""],
                    ["14", ""],
                    ["15", ""],
                    ["16", "active"],
                    ["17", ""],
                    ["18", ""],
                    ["19", ""],
                    ["20", ""],
                    ["21", ""],
                    ["22", "active"],
                    ["23", ""],
                    ["24", "closed"],
                    ["25", "active"],
                    ["26", ""],
                    ["27", ""],
                    ["28", ""],
                    ["29", ""],
                    ["30", "active"],
                    ["31", ""],
                    ["", ""],
                    ["", ""],
                    ["", ""],
                    ["", ""],
                  ].map(([value, state], index) => {
                    const stateClass =
                      state === "active"
                        ? "bg-[#E8F6F7] text-[#008992] font-bold"
                        : state === "closed"
                          ? "bg-[#F3F7F7] text-[#8A94A6] font-semibold"
                          : state === "muted"
                            ? "bg-white text-[#BAC2D0] font-semibold"
                            : "bg-white text-[#222831] font-semibold";

                    return (
                      <span
                        className={`grid h-[44px] place-items-center rounded-[14px] text-[14px] ${stateClass}`}
                        key={`${value}-${index}`}
                      >
                        {value}
                      </span>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-[16px] rounded-[28px] border border-[#DDEEEF] bg-white p-6">
              <h3 className="text-[22px] font-bold text-[#222831]">
                이용 전 체크
              </h3>

              <div className="flex flex-col gap-3">
                {[
                  ["추천 이용 목적", "팝업, 전시, 쇼룸, 촬영"],
                  ["추천 배치", "오픈 전면부 + 메인 존 + 대기존"],
                  ["반입 제한", "화기 사용 불가, 대형 구조물 사전 협의"],
                  ["추가 옵션", "집기 추가, 냉장고 사용, 현수막 설치 별도 확인"],
                ].map(([label, value]) => (
                  <div className="flex items-center justify-between" key={label}>
                    <span className="text-[14px] font-bold text-[#67728A]">
                      {label}
                    </span>
                    <span className="text-[14px] font-semibold text-[#222831]">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="rounded-[18px] bg-[#E8F6F7] p-4">
                <p className="text-[15px] font-bold leading-[1.4] text-[#00ADB5]">
                  판매자 메모
                </p>
                <p className="mt-2 text-[13px] font-medium leading-[1.4] text-[#4E5C72]">
                  주말 오후 유동 인구가 많은 편이라 입구 대기선과 메인 사용
                  구역을 분리해서 운영하는 편이 좋습니다.
                </p>
              </div>
            </section>
          </aside>
        </section>

        <section className="mt-7">
          <h2 className="text-[28px] font-bold leading-[1.4] text-[#222831]">
            비슷한 공간
          </h2>
          <div className="mt-5 grid grid-cols-3 gap-4">
            {relatedSpaces.map((space) => (
                <RelatedSpaceCard
                  key={space.title}
                  capacity={space.capacity}
                  image={space.image}
                  likes={space.likes}
                  meta={space.meta}
                  price={space.price}
                  tags={space.tags}
                  title={space.title}
                  views={space.views}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
