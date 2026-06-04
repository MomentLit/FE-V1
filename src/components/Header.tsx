"use client";

import Image from "next/image";
import type { FormEvent } from "react";
import { useState } from "react";

const navItems = [
  ["홈", "top"],
  ["공간 찾기", "space-search"],
  ["캘린더", "calendar"],
  ["AI 공간 매칭", "ai-match"],
];

function BellIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
      <path
        d="M14.298534 4.617417c-1.02899-1.13768-2.9406-2.03735-4.58893-2.00594-1.65167-.03141-3.55995.86744-4.58894 2.00512-1.02899 1.13768-1.59868 2.61702-1.59856 4.15101v2.56905l-.57173 1.52295c-.10534.28092-.14102.58319-.10398.88091.03704.29773.14569.58204.31665.82858.17096.24654.39913.44798.66498.58705.26584.13907.56143.21163.86145.21146h2.4915c0 .6702.26623 1.31294.74013 1.78684.4739.4739 1.11665.74013 1.78685.74013.6702 0 1.31294-.26623 1.78684-.74013.4739-.4739.74013-1.11665.74013-1.78684h2.4948c.29985-.00002.59523-.07267.86088-.21175.26565-.13908.49364-.34044.66449-.58686.17085-.24642.27946-.53056.31653-.82811.03708-.29755.00152-.59965-.10362-.88046l-.5709-1.52295v-2.56905c.00012-1.53399-.56958-3.01333-1.59857-4.15101Zm-9.53893 4.15019v2.5707c0 .14685-.02722.2937-.07838.43147l-.57172 1.5246c-.03504.09358-.0469.19426-.03455.29342.01235.09916.04852.19386.10544.27599.05692.08213.13288.14926.22139.19564.08851.04638.18694.07063.28687.07068h10.04107c.09993-.00005.19835-.0243.28687-.07068.08851-.04638.16447-.1135.22139-.19564.05692-.08213.0931-.17683.10544-.27599.01235-.09916.00049-.19984-.03455-.29342l-.57172-1.5246c-.05132-.13806-.07758-.28418-.07755-.43147v-2.5707c0-.65004-.12804-1.29372-.3768-1.89428-.24876-.60056-.61337-1.14625-1.07303-1.6059-.45965-.45965-1.00533-.82426-1.60589-1.07302-.60056-.24876-1.24424-.3768-1.89428-.3768-.65004 0-1.29372.12804-1.89429.3768-.60056.24876-1.14625.61337-1.60589 1.07302-.45965.45965-.82426 1.00533-1.07303 1.6059-.24876.60056-.3768 1.24424-.37679 1.89428Zm4.04774 7.49064c-.24082-.2348-.38036-.55441-.38887-.89064h2.57813c-.00851.33624-.14805.65584-.38887.89064-.24082.2348-.56385.36622-.9002.36622-.33634 0-.65937-.13142-.90019-.36622Z"
        fill="#67728A"
        stroke="#67728A"
        strokeWidth="0.5"
      />
      <circle
        cx="15.93"
        cy="3.93"
        r="3.46"
        fill="#DA294A"
        stroke="#DA294A"
        strokeWidth="2.08"
      />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
      <path
        d="M10.934983 20.855969 7.874983 16.124969l-4.731-3.06c-.56494-.3649-1.01637-.88076-1.30312-1.48911-.28675-.60835-.39736-1.28485-.31929-1.95285.07807-.66799.3417-1.30076.76102-1.82658.41931-.52582.97753-.92368 1.61139-1.14846l13.9095-4.944c.6267-.22252 1.30364-.26289 1.95235-.11645.64871.14645 1.24264.47372 1.71298.9439.47033.47017.7978 1.064.94446 1.71266.14666.64866.10652 1.32561-.11579 1.95239l-2.1225-.7515c.08138-.22604.09676-.47056.04436-.70502-.05241-.23445-.17044-.44916-.34031-.61903-.16987-.16987-.38458-.28791-.61904-.34031-.23445-.05241-.47898-.03702-.70501.04436l-13.905 4.944c-.23785.08392-.44743.23278-.60499.42973-.15756.19694-.2568.43409-.28647.68455-.02967.25046.01142.50423.11861.73254.10719.2283.27619.42202.48785.55918l4.17 2.6985 4.9185-4.92c.10383-.1074.22801-.19304.36529-.25194.13728-.05889.28492-.08986.4343-.09109.14938-.00123.2975.02731.43573.08394.13823.05663.2638.14023.36938.2459.10558.10568.18905.23133.24555.36961.0565.13828.0849.28644.08353.43582-.00137.14938-.03247.29698-.0915.4342-.05902.13723-.14478.26132-.25228.36506l-4.9185 4.92 2.6985 4.1685c.13693.21173.33042.38088.55854.48828.22813.10741.48178.14878.73222.11943.25043-.02935.48764-.12826.68475-.2855.19711-.15725.34624-.36655.43049-.60421l4.9455-13.908 2.1195.753-4.944 13.9095c-.22497.63349-.62283 1.19134-1.14851 1.61036-.52569.41902-1.1582.68248-1.82591.76054-.66771.07806-1.34393-.0324-1.95209-.31888-.60816-.28647-1.12396-.73751-1.48899-1.30202Z"
        fill="#67728A"
      />
      <circle
        cx="18.48"
        cy="3.81"
        r="3.46"
        fill="#DA294A"
        stroke="#DA294A"
        strokeWidth="2.08"
      />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <span className="grid h-[31.5px] w-[31.5px] place-items-center rounded-full bg-[#99A1B1]">
      <svg aria-hidden="true" className="h-[23.625px] w-[23.625px]" viewBox="0 0 23.625 23.625">
        <path
          d="M11.671875 2.953125c-2.34721 0-4.25 1.90279-4.25 4.25s1.90279 4.25 4.25 4.25 4.25-1.90279 4.25-4.25-1.90279-4.25-4.25-4.25Zm2.50807 10.39078c-1.66153-.26517-3.3546-.26517-5.01614 0l-.1781.02843c-2.34116.37364-4.06383 2.39304-4.06383 4.76382 0 1.27963 1.03734 2.31697 2.31697 2.31697h8.86606c1.27963 0 2.31697-1.03734 2.31697-2.31697 0-2.37079-1.72267-4.39019-4.06384-4.76382l-.17809-.02843Z"
          fill="#363853"
        />
      </svg>
    </span>
  );
}

export function Header() {
  const [activeNav, setActiveNav] = useState("공간 찾기");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActiveNav("공간 찾기");
  }

  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-7">
        <div className="flex w-[163.5px] items-center">
          <Image
            src="/Logo.png"
            alt="MomentLit"
            width={56}
            height={40}
            priority
            className="h-10 w-14 object-contain"
          />
        </div>

        <nav className="flex h-16 items-center gap-2 text-[18px] font-semibold leading-[1.3] text-[#67728A]">
          {navItems.map(([item]) => {
            const active = item === activeNav;

            return (
              <button
                className={`grid h-16 place-items-center rounded-full px-[18px] transition ${
                  active
                    ? "bg-[#00ADB5]/[0.07] text-[#00ADB5]"
                    : "hover:text-[#00ADB5]"
                }`}
                key={item}
                onClick={() => setActiveNav(item)}
                type="button"
              >
                {item}
              </button>
            );
          })}
        </nav>

        <div className="flex w-[163.5px] items-center justify-end gap-5">
          <button
            className="rounded-full bg-[#222831] px-3.5 py-2 text-[12px] font-bold text-white"
            onClick={() => setActiveNav("공간 찾기")}
            type="button"
          >
            MY PICK
          </button>
          <button
            aria-label="알림"
            type="button"
          >
            <BellIcon />
          </button>
          <button
            aria-label="메시지"
            type="button"
          >
            <PlaneIcon />
          </button>
          <button
            aria-label="프로필"
            type="button"
          >
            <ProfileIcon />
          </button>
        </div>
      </div>

      <div className="flex h-16 items-start justify-center bg-white px-7 pb-2">
        <form
          className="flex w-[760px] items-center gap-[14.4px] rounded-[90px] bg-[#F7FBFB] py-2 pl-[18px] pr-2"
          onSubmit={handleSearch}
        >
          <span className="rounded-full bg-[#00ADB5]/[0.08] px-3.5 py-2 text-[13px] font-bold text-[#00ADB5]">
            HOT 키워드
          </span>
          <input
            aria-label="검색"
            className="h-8 w-[560px] bg-transparent text-[16px] font-medium text-[#67728A] outline-none placeholder:text-[#67728A]"
            name="query"
            placeholder="성수 팝업, 캐릭터 전시, 부산 로컬 마켓처럼 검색해보세요."
            type="search"
          />
          <button
            aria-label="검색"
            className="grid h-8 w-8 place-items-center rounded-full bg-[#00ADB5] text-white"
            type="submit"
          >
            <svg aria-hidden="true" className="h-[17px] w-[17px]" fill="none" viewBox="0 0 24 24">
              <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="2" />
              <path d="M15.5 15.5 21 21" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </button>
        </form>
      </div>
    </header>
  );
}
