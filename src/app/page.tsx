import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const heroCards = [
  {
    title: "Vintage pop store",
    image:
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=520&q=80",
    size: "side",
  },
  {
    title: "Poster atelier",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=620&q=80",
    size: "mid",
  },
  {
    title: "Seoul walk",
    image:
      "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=860&q=80",
    size: "main",
  },
  {
    title: "Gallery night",
    image:
      "https://images.unsplash.com/photo-1514894780887-121968d00567?auto=format&fit=crop&w=620&q=80",
    size: "mid dark",
  },
  {
    title: "Warm room",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=520&q=80",
    size: "side",
  },
];

const todayCards = [
  ["피크닉 감성 공간", "서울 성수동", "1시간 전"],
  ["밤 산책 사진 모임", "서울 망원동", "3시간 전"],
  ["작은 북토크 살롱", "서울 연남동", "오늘 19:00"],
  ["필름 카메라 클래스", "서울 을지로", "예약 가능"],
  ["주말 빈티지 마켓", "서울 한남동", "D-2"],
  ["햇살 드로잉 룸", "서울 합정동", "신규"],
];

const tasteCards = [
  ["혼자 집중하는 카페", "잔잔한 음악과 콘센트가 있는 곳", "4.9"],
  ["책 읽기 좋은 공간", "오후 빛이 오래 머무는 작은 서가", "4.8"],
  ["대화가 잘 되는 바", "소음이 낮고 테이블 간격이 넓은 바", "4.7"],
  ["취향 기록 워크숍", "일상을 한 장면으로 남기는 모임", "4.9"],
  ["감성 포토 부스", "따뜻한 톤의 조명과 소품", "4.6"],
  ["로컬 큐레이션", "이번 주 가장 많이 저장된 장소", "4.8"],
];

const analysisCards = [
  ["창가 자리 선호", "밝은 오후, 낮은 소음"],
  ["소규모 모임", "4명 이하 추천"],
  ["빈티지 무드", "나무, 패브릭, 오래된 조명"],
  ["도보 접근성", "역에서 10분 이내"],
  ["기록하기 좋은 곳", "사진/메모 친화"],
  ["밤 분위기", "따뜻한 조도"],
  ["작업 친화", "와이파이와 좌석"],
  ["혼자 머무름", "조용한 1인석"],
  ["전시 연계", "갤러리 주변"],
  ["음악 취향", "재즈/시티팝"],
  ["반려동물 가능", "야외 좌석"],
  ["새로운 취향", "AI 추천 업데이트"],
];

function Hero() {
  return (
    <section className="relative h-[572px] overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-5 h-[476px]">
        <div className="flex h-full w-full items-center justify-center gap-5">
          {heroCards.map((card) => (
            <article
              aria-label={card.title}
              className={`hero-card ${card.size}`}
              key={card.title}
              style={{ backgroundImage: `url(${card.image})` }}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-[58px] left-1/2 flex -translate-x-1/2 items-center gap-[10px]">
        <span className="h-1.5 w-11 rounded-full bg-[#10B7C5]" />
        <span className="h-1.5 w-7 rounded-full bg-[#D3DADD]" />
        <span className="h-1.5 w-7 rounded-full bg-[#D3DADD]" />
        <span className="h-1.5 w-7 rounded-full bg-[#D3DADD]" />
      </div>
    </section>
  );
}

function Card({
  accent,
  meta,
  title,
}: {
  accent?: boolean;
  meta: string;
  title: string;
}) {
  return (
    <article className="group w-full">
      <div className="relative aspect-[160/205] overflow-hidden rounded-[6px] border border-[#C4CCD1] bg-[#EEF1F3] card-pattern">
        {accent ? (
          <span className="absolute right-2 top-2 text-[14px] leading-none text-[#FF4E8A]">
            ♥
          </span>
        ) : null}
      </div>
      <div className="mt-3 min-h-[54px] text-[12px] leading-[1.45] text-[#6D7880]">
        <h3 className="mb-1 truncate text-[13px] font-medium text-[#29333B]">
          {title}
        </h3>
        <p>{meta}</p>
      </div>
    </article>
  );
}

function Section({
  children,
  subtitle,
  title,
}: {
  children: React.ReactNode;
  subtitle: string;
  title: string;
}) {
  return (
    <section className="border-t border-[#C9D2D7] pt-4">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-[21px] font-semibold tracking-normal text-[#202A31]">
            {title}
          </h2>
          <p className="mt-2 text-[13px] text-[#6A767E]">{subtitle}</p>
        </div>
        <a
          className="mt-1 text-[12px] font-semibold text-[#00AEBB] transition hover:text-[#087F89]"
          href="#"
        >
          전체 보기
        </a>
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#172129]">
      <Header />
      <main>
        <Hero />

        <div className="mx-auto flex max-w-[1440px] flex-col gap-9 px-12 pb-[140px]">
          <Section
            title="Today's Pick"
            subtitle="지금 가장 많이 저장된 감각적인 순간을 만나보세요."
          >
            <div className="grid grid-cols-6 gap-6">
              {todayCards.map(([title, place, time], index) => (
                <Card
                  accent={index === 2}
                  key={title}
                  meta={`${place} · ${time}`}
                  title={title}
                />
              ))}
            </div>
          </Section>

          <Section
            title="요즘 취향 탐구"
            subtitle="MomentLit이 발견한 새로운 공간과 취향의 흐름이에요."
          >
            <div className="grid grid-cols-6 gap-6">
              {tasteCards.map(([title, desc, rating]) => (
                <Card
                  key={title}
                  meta={`${desc} · ${rating}`}
                  title={title}
                />
              ))}
            </div>
          </Section>

          <Section
            title="당신의 취향 분석"
            subtitle="저장한 순간과 검색 기록을 바탕으로 어울리는 공간을 추천해드려요."
          >
            <div className="grid grid-cols-6 gap-x-6 gap-y-8">
              {analysisCards.map(([title, meta], index) => (
                <Card
                  accent={index === 8}
                  key={title}
                  meta={meta}
                  title={title}
                />
              ))}
            </div>
          </Section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
