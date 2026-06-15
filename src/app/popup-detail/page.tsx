import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const heroPoster =
  "https://images.unsplash.com/photo-1759730840961-09faa5731a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzgxMTA0OTd8&ixlib=rb-4.1.0&q=80&w=1080";

const summaryInfo = [
  ["진행 기간", "6월 21일 - 7월 5일"],
  ["팝업 유형", "굿즈 · 체험 · 포토존"],
  ["장소", "성수동 메인 스트리트 1F"],
  ["운영시간", "11:00 - 20:00"],
];

const relatedPopupCards = [
  {
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?fit=max&fm=jpg&q=80&w=1200",
    title: "한남 리미티드 브랜드 팝업",
    meta: "서울 용산구 · 6월 25일 - 7월 9일",
    tags: ["브랜드 팝업"],
    views: "1.6k",
    likes: "132",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?fit=max&fm=jpg&q=80&w=1200",
    title: "연남 아트 토이 전시 팝업",
    meta: "서울 마포구 · 6월 22일 - 7월 6일",
    tags: ["전시"],
    views: "1.4k",
    likes: "96",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?fit=max&fm=jpg&q=80&w=1200",
    title: "성수 캐릭터 체험형 스토어",
    meta: "서울 성동구 · 6월 28일 - 7월 12일",
    tags: ["촬영"],
    views: "1.9k",
    likes: "184",
  },
];

function SummaryStatRow() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-[16px] leading-none text-[#8A94A6]">👁</span>
        <span className="text-[14px] font-bold text-[#5E687E]">1.8k</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[14px] font-bold text-[#5E687E]">247</span>
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

function SummaryCard() {
  return (
    <section className="flex flex-col gap-[18px] rounded-[28px] border border-[#DDEEEF] bg-white p-6">
      <SummaryStatRow />

      <h2 className="w-full text-[32px] font-bold leading-[1.4] text-[#222831]">
        성수 한정 캐릭터 팝업스토어
      </h2>

      <div className="flex flex-col gap-2.5">
        <span className="inline-flex w-fit rounded-full bg-[#E8F6F7] px-[14px] py-[10px] text-[14px] font-bold text-[#00ADB5]">
          진행중
        </span>

        <div className="flex flex-col gap-2 rounded-[20px] border border-[#DDEEEF] bg-[#F8FBFB] p-[18px]">
          {summaryInfo.map(([label, value]) => (
            <div className="flex items-center justify-between gap-4" key={label}>
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
  );
}

function ConnectedSpaceCard() {
  return (
    <section className="flex flex-col gap-4 rounded-[28px] border border-[#DDEEEF] bg-white p-6">
      <h3 className="text-[22px] font-bold leading-[1.4] text-[#222831]">
        연결된 공간
      </h3>

      <article className="flex flex-col gap-3 rounded-[24px] border border-[#DDEEEF] bg-white p-4">
        <div className="relative h-[152px] w-full overflow-hidden rounded-[18px]">
          <Image
            src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?fit=max&fm=jpg&q=80&w=1200"
            alt="성수 아트 라운지"
            fill
            sizes="408px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="text-[18px] font-bold text-[#222831]">
            성수 아트 라운지
          </h4>
          <p className="text-[13px] font-medium text-[#67728A]">
            서울 성동구 · 도보 3분 · 최대 80명
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {["브랜드 팝업", "전시", "촬영"].map((tag) => (
            <span
              className="rounded-full border border-[#DDEEEF] bg-[#F8FBFB] px-[14px] py-[10px] text-[14px] font-medium text-[#67728A]"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[16px] font-bold text-[#222831]">
              120만원 / 일
            </span>
            <span className="text-[12px] font-medium text-[#67728A]">
              잔여 일정 3개
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[14px] leading-none text-[#8A94A6]">👁</span>
              <span className="text-[12px] font-bold text-[#5E687E]">1.9k</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-bold text-[#5E687E]">184</span>
              <button
                className="grid h-7 w-7 place-items-center rounded-full border border-[#DDEEEF] bg-[#F8FBFB] text-[12px] font-bold text-[#FF6B81]"
                type="button"
              >
                ♡
              </button>
            </div>
          </div>
        </div>
      </article>

      <div className="rounded-[18px] bg-[#E8F6F7] p-4">
        <p className="text-[18px] font-bold leading-[1.32] text-[#00ADB5]">
          매칭 포인트
        </p>
        <p className="mt-2 text-[13px] font-medium leading-[1.4] text-[#4E5C72]">
          성수 메인 상권에 있고 포스터 노출 면적이 좋아서 굿즈형 팝업이나
          포토존 중심 팝업과 특히 궁합이 좋습니다.
        </p>
      </div>
    </section>
  );
}

function ProgramCard() {
  const items = [
    [
      "한정 굿즈존",
      "이번 팝업에서만 구매 가능한 메인 굿즈와 선공개 상품을 볼 수 있어요.",
    ],
    [
      "체험 이벤트",
      "현장 스탬프 미션과 참여형 체험 부스가 같이 운영됩니다.",
    ],
    [
      "포토존",
      "메인 비주얼을 활용한 포토존이 마련되어 있어 인증샷 동선이 잘 나옵니다.",
    ],
  ];

  return (
    <section className="flex flex-col gap-[18px] rounded-[30px] bg-white px-8 py-7">
      <h2 className="text-[30px] font-bold text-[#222831]">팝업 구성</h2>
      <div className="grid grid-cols-3 gap-3.5">
        {items.map(([title, body]) => (
          <article
            className="rounded-[20px] bg-[#F8FBFB] p-[18px]"
            key={title}
          >
            <h3 className="text-[18px] font-bold text-[#222831]">{title}</h3>
            <p className="mt-2 text-[14px] font-medium leading-[1.4] text-[#5E687E]">
              {body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RelatedCard({
  image,
  likes,
  meta,
  tags,
  title,
  views,
}: {
  image: string;
  likes: string;
  meta: string;
  tags: string[];
  title: string;
  views: string;
}) {
  return (
    <article className="flex h-[220px] rounded-[24px] border border-[#DDEEEF] bg-white p-4">
      <div className="relative h-[188px] w-[148px] shrink-0 overflow-hidden rounded-[18px]">
        <Image src={image} alt={title} fill sizes="148px" className="object-cover" />
      </div>

      <div className="ml-4 flex h-full flex-1 flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[14px] leading-none text-[#8A94A6]">👁</span>
            <span className="text-[12px] font-bold text-[#5E687E]">{views}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-bold text-[#5E687E]">{likes}</span>
            <button
              className="grid h-7 w-7 place-items-center rounded-full border border-[#DDEEEF] bg-[#F8FBFB] text-[12px] font-bold text-[#FF6B81]"
              type="button"
            >
              ♡
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              className="rounded-full border border-[#DDEEEF] bg-[#F8FBFB] px-[14px] py-[10px] text-[14px] font-medium text-[#67728A]"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-[17px] font-bold leading-[1.34] text-[#222831]">
            {title}
          </h3>
          <p className="text-[13px] font-medium leading-[1.42] text-[#67728A]">
            {meta}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function PopupDetailPage() {
  return (
    <div className="min-h-screen bg-[#F8FBFB] text-[#222831]" id="top">
      <Header />

      <main className="mx-auto mt-8 flex w-[1180px] flex-col gap-11 pb-[96px]">
        <section className="flex gap-8">
          <div className="flex w-[740px] flex-col gap-3">
            <div className="flex flex-col gap-3">
              <p className="text-[12px] font-bold text-[#00ADB5]">
                MOMENTLIT POPUP DETAIL
              </p>
              <h1 className="text-[42px] font-bold leading-[1.4] text-[#222831]">
                성수 한정 캐릭터 팝업스토어
              </h1>
            </div>

            <div className="relative h-[1057px] w-[740px] overflow-hidden rounded-[24px]">
              <Image
                src={heroPoster}
                alt="성수 한정 캐릭터 팝업스토어"
                fill
                priority
                sizes="740px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex w-[408px] flex-col gap-5 pt-[92px]">
            <SummaryCard />
            <ConnectedSpaceCard />
          </div>
        </section>

        <section className="rounded-[30px] bg-white px-8 py-7">
          <h2 className="text-[30px] font-bold text-[#222831]">팝업 소개</h2>
          <p className="mt-[18px] w-[1116px] text-[18px] font-medium leading-[1.75] text-[#5E687E]">
            성수 한정 캐릭터 팝업스토어로, 신작 굿즈 공개와 체험형 전시를 함께
            즐길 수 있는 행사입니다. 입구부터 메인 전시존, 굿즈존, 포토존까지
            동선이 자연스럽게 이어져 방문 만족도가 높아요.
          </p>
        </section>

        <section className="rounded-[30px] bg-[#E8F6F7] px-8 py-7">
          <h2 className="text-[30px] font-bold text-[#222831]">팝업 AI 설명</h2>
          <p className="mt-[18px] w-[1116px] text-[18px] font-medium leading-[1.75] text-[#4F5D73]">
            이 팝업은 굿즈 구매만 빠르게 끝내기보다 체험, 포토존, 전시 동선을
            함께 즐길 때 만족도가 높은 타입입니다. 특히 캐릭터 팬이나 한정판
            굿즈를 노리는 방문자라면 오픈 직후 방문이 가장 효율적이고,
            주말보다는 평일 저녁이 비교적 여유롭게 둘러보기 좋아요.
          </p>
        </section>

        <ProgramCard />

        <section className="flex flex-col gap-[18px]">
          <h2 className="text-[28px] font-bold leading-[1.4] text-[#222831]">
            비슷한 팝업
          </h2>

          <div className="grid grid-cols-3 gap-4">
            {relatedPopupCards.map((card) => (
              <RelatedCard key={card.title} {...card} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
