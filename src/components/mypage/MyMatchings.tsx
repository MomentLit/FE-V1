"use client";

import { useEffect, useMemo, useState } from "react";
import {
  fetchReceivedMatchings,
  fetchSentMatchings,
  type Matching,
} from "@/lib/matchings";

type MatchingView = "received" | "sent";

const filters = [
  { label: "전체", status: null },
  { label: "요청", status: "REQUESTED" },
  { label: "승인", status: "APPROVED" },
  { label: "거절", status: "REJECTED" },
] as const;

function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "날짜 정보 없음";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatPrice(value: number) {
  if (!Number.isFinite(value)) {
    return "가격 정보 없음";
  }

  return `${new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: 2,
  }).format(value)}원`;
}

function getStatusLabel(status: string) {
  switch (status) {
    case "APPROVED":
      return "승인";
    case "REJECTED":
      return "거절";
    case "REQUESTED":
      return "요청";
    default:
      return status || "상태 없음";
  }
}

function getStatusClass(status: string) {
  switch (status) {
    case "APPROVED":
      return "bg-[#EAF7EA] text-[#2D8A57]";
    case "REJECTED":
      return "bg-[#FCECEC] text-[#B34848]";
    case "REQUESTED":
      return "bg-[#FFF4DE] text-[#C88700]";
    default:
      return "bg-[#F1F5F6] text-[#4F5D73]";
  }
}

function MatchingRow({ matching }: { matching: Matching }) {
  return (
    <article className="grid min-h-[92px] grid-cols-[90px_220px_230px_130px_110px_112px] border-b border-[#EEF1F1] bg-white text-[14px] text-[#222831] last:border-b-0">
      <div className="flex items-center px-4 font-bold">
        #{matching.matching_id}
      </div>
      <div className="flex items-center px-4 font-semibold">
        {matching.address}
      </div>
      <div className="flex flex-col justify-center gap-1 px-4 text-[13px] font-medium text-[#5E687E]">
        <span>{formatDateTime(matching.start_time)}</span>
        <span>{formatDateTime(matching.end_time)}</span>
      </div>
      <div className="flex items-center px-4 font-semibold">
        {formatPrice(matching.total_price)}
      </div>
      <div className="flex items-center px-4">
        <span
          className={`rounded-full px-3 py-2 text-[12px] font-bold ${getStatusClass(matching.status)}`}
        >
          {getStatusLabel(matching.status)}
        </span>
      </div>
      <div className="flex items-center px-4 text-[13px] font-medium text-[#5E687E]">
        {formatDateTime(matching.created_at)}
      </div>
    </article>
  );
}

export function MyMatchings() {
  const [selectedView, setSelectedView] =
    useState<MatchingView>("received");
  const [receivedMatchings, setReceivedMatchings] = useState<Matching[]>([]);
  const [sentMatchings, setSentMatchings] = useState<Matching[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [receivedLoading, setReceivedLoading] = useState(true);
  const [sentLoading, setSentLoading] = useState(true);
  const [receivedError, setReceivedError] = useState("");
  const [sentError, setSentError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadMatchings() {
      const [receivedResult, sentResult] = await Promise.allSettled([
        fetchReceivedMatchings(),
        fetchSentMatchings(),
      ]);

      if (!active) {
        return;
      }

      if (receivedResult.status === "fulfilled") {
        setReceivedMatchings(receivedResult.value);
      } else {
        setReceivedError("받은 매칭 목록을 불러오지 못했습니다.");
      }

      if (sentResult.status === "fulfilled") {
        setSentMatchings(sentResult.value);
      } else {
        setSentError("보낸 매칭 목록을 불러오지 못했습니다.");
      }

      setReceivedLoading(false);
      setSentLoading(false);
    }

    void loadMatchings();

    return () => {
      active = false;
    };
  }, []);

  const matchings =
    selectedView === "received" ? receivedMatchings : sentMatchings;
  const loading =
    selectedView === "received" ? receivedLoading : sentLoading;
  const error = selectedView === "received" ? receivedError : sentError;

  const filteredMatchings = useMemo(
    () =>
      selectedStatus
        ? matchings.filter((matching) => matching.status === selectedStatus)
        : matchings,
    [matchings, selectedStatus],
  );

  const requestedCount = matchings.filter(
    (matching) => matching.status === "REQUESTED",
  ).length;
  const approvedCount = matchings.filter(
    (matching) => matching.status === "APPROVED",
  ).length;

  const matchingStats = [
    {
      label: selectedView === "received" ? "받은 요청" : "보낸 요청",
      value: matchings.length,
      valueClass: "text-[#00ADB5]",
    },
    {
      label: "검토 대기",
      value: requestedCount,
      valueClass: "text-[#C56A00]",
    },
    {
      label: "확정 매칭",
      value: approvedCount,
      valueClass: "text-[#12A66A]",
    },
  ];

  return (
    <section className="flex w-[932px] flex-col gap-6">
      <div className="flex flex-col gap-2.5 pb-1">
        <p className="text-[14px] font-bold text-[#00ADB5]">
          MOMENTLIT MATCHING
        </p>
        <h2 className="text-[42px] font-bold text-[#222831]">
          {selectedView === "received" ? "받은 매칭 요청" : "보낸 매칭 요청"}
        </h2>
        <p className="w-[760px] text-[18px] font-medium text-[#5E687E]">
          {selectedView === "received"
            ? "내 공간으로 들어온 매칭 요청의 일정, 금액, 진행 상태를 확인할 수 있어요."
            : "내가 보낸 매칭 요청의 일정, 금액, 진행 상태를 확인할 수 있어요."}
        </p>
      </div>

      <div className="flex w-fit rounded-full bg-white p-1.5">
        {[
          { label: "받은 요청", value: "received" },
          { label: "보낸 요청", value: "sent" },
        ].map(({ label, value }) => {
          const active = selectedView === value;

          return (
            <button
              className={`rounded-full px-6 py-3 text-[15px] font-bold ${
                active
                  ? "bg-[#00ADB5] text-white"
                  : "text-[#5E687E]"
              }`}
              key={value}
              onClick={() => {
                setSelectedView(value as MatchingView);
                setSelectedStatus(null);
              }}
              type="button"
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="flex gap-4">
        {matchingStats.map(({ label, value, valueClass }) => (
          <article
            className="flex flex-1 flex-col gap-2 rounded-3xl border border-[#DDEEEF] bg-white p-[22px]"
            key={label}
          >
            <p className="text-[14px] font-bold text-[#5E687E]">{label}</p>
            <strong className={`text-[34px] font-bold ${valueClass}`}>
              {value}
            </strong>
          </article>
        ))}
      </div>

      <section className="flex flex-col gap-5 rounded-[30px] border border-[#DDEEEF] bg-white p-7">
        <div className="flex items-center justify-between">
          <div className="flex w-[500px] flex-col gap-1.5">
            <h3 className="text-[26px] font-bold text-[#222831]">
              {selectedView === "received"
                ? "받은 요청 목록"
                : "보낸 요청 목록"}
            </h3>
            <p className="text-[15px] font-medium text-[#5E687E]">
              총 {matchings.length}개의 요청 중 검토 대기 {requestedCount}개가
              있어요.
            </p>
          </div>
          <div className="flex gap-2">
            {filters.map(({ label, status }) => {
              const active = status === selectedStatus;

              return (
                <button
                  className={`rounded-full px-3 py-2 text-[13px] font-bold ${
                    active
                      ? "bg-[#E8F6F7] text-[#00ADB5]"
                      : "bg-[#F3F7F7] text-[#5E687E]"
                  }`}
                  key={label}
                  onClick={() => setSelectedStatus(status)}
                  type="button"
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <p className="py-16 text-center text-[14px] text-[#5E687E]">
            매칭 목록을 불러오는 중입니다.
          </p>
        ) : error ? (
          <p
            className="py-16 text-center text-[14px] text-[#B34848]"
            role="alert"
          >
            {error}
          </p>
        ) : filteredMatchings.length === 0 ? (
          <p className="py-16 text-center text-[14px] text-[#5E687E]">
            해당 상태의 매칭 요청이 없습니다.
          </p>
        ) : (
          <div className="overflow-hidden rounded-[22px] border border-[#DDEEEF]">
            <div className="grid h-14 grid-cols-[90px_220px_230px_130px_110px_112px] bg-[#EEF8F8] text-[13px] font-bold text-[#5E687E]">
              {["번호", "주소", "이용 일정", "총 금액", "상태", "요청일"].map(
                (heading) => (
                  <div className="flex items-center px-4" key={heading}>
                    {heading}
                  </div>
                ),
              )}
            </div>
            {filteredMatchings.map((matching) => (
              <MatchingRow
                key={`${matching.matching_id}-${matching.created_at}-${matching.address}`}
                matching={matching}
              />
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
