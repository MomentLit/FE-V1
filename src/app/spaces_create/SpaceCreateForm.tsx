"use client";

import { type FormEvent, useState } from "react";

const infoFields = [
  {
    id: "category",
    label: "카테고리",
    type: "select" as const,
    options: ["팝업 스토어", "전시", "쇼룸", "스튜디오"],
  },
  {
    id: "region",
    label: "지역",
    type: "input" as const,
    placeholder: "예) 서울 성수동",
  },
  {
    id: "capacity",
    label: "수용 인원",
    type: "input" as const,
    placeholder: "예) 최대 100명",
  },
  {
    id: "schedule",
    label: "운영 가능 일정",
    type: "select" as const,
    options: ["평일 / 주말 모두 가능", "평일만 가능", "주말만 가능"],
  },
  {
    id: "price",
    label: "희망 대관 단가",
    type: "input" as const,
    placeholder: "예) 일 120만원부터",
  },
  {
    id: "contact",
    label: "연락 방식",
    type: "select" as const,
    options: ["이메일 + 플랫폼 메시지", "이메일", "플랫폼 메시지"],
  },
] as const;

const initialForm = {
  title: "예) 성수 브랜드 팝업 전용 쇼룸",
  description:
    "예) 성수 메인 동선에 위치한 이 공간은 브랜드 팝업, 쇼룸, 전시에 잘 어울립니다.\n전면 유리와 높은 층고 덕분에 낮에는 자연광이 풍부하고, 저녁에는 조명 연출이 깔끔하게 살아납니다.\n\n가구 배치가 유연해서 행사 성격에 맞게 동선을 구성하기 좋고, 방문객이 사진 찍기 좋은 포인트도 충분합니다.",
  category: "팝업 스토어",
  region: "서울 성수동",
  capacity: "100명",
  schedule: "평일 / 주말 모두 가능",
  price: "일 120만원부터",
  contact: "이메일 + 플랫폼 메시지",
};

type FormState = typeof initialForm;

function FieldControl({
  field,
  onChange,
  value,
}: {
  field: (typeof infoFields)[number];
  onChange: (name: keyof FormState, value: string) => void;
  value: string;
}) {
  const commonClassName =
    "h-[58px] w-full rounded-[16px] border border-[#C8E4E6] bg-white px-[18px] text-[15px] font-medium text-[#222831] outline-none transition focus:border-[#00ADB5]";

  if (field.type === "select") {
    return (
      <label className="flex flex-col gap-2" htmlFor={field.id}>
        <span className="text-[14px] font-semibold text-[#222831]">{field.label}</span>
        <select
          className={commonClassName}
          id={field.id}
          name={field.id}
          value={value}
          onChange={(event) => onChange(field.id as keyof FormState, event.target.value)}
        >
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label className="flex flex-col gap-2" htmlFor={field.id}>
      <span className="text-[14px] font-semibold text-[#222831]">{field.label}</span>
      <input
        className={commonClassName}
        id={field.id}
        name={field.id}
        onChange={(event) => onChange(field.id as keyof FormState, event.target.value)}
        placeholder={field.placeholder}
        value={value}
      />
    </label>
  );
}

export function SpaceCreateForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [statusMessage, setStatusMessage] = useState("");

  const handleFieldChange = (name: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleDraftSave = () => {
    setStatusMessage("임시 저장했습니다.");
    console.log("space-create draft", form);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage("등록 요청을 보냈습니다.");
    console.log("space-create submit", form);
  };

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <section className="rounded-[30px] bg-white p-7">
        <h2 className="text-[28px] font-bold text-[#222831]">제목</h2>
        <label className="mt-4 block" htmlFor="title">
          <span className="sr-only">제목</span>
          <input
            className="flex h-[58px] w-full items-center rounded-[16px] border border-[#C8E4E6] bg-white px-[18px] text-[15px] font-medium text-[#222831] outline-none transition placeholder:text-[#99A1B1] focus:border-[#00ADB5]"
            id="title"
            name="title"
            onChange={(event) => handleFieldChange("title", event.target.value)}
            placeholder="예) 성수 브랜드 팝업 전용 쇼룸"
            value={form.title}
          />
        </label>
      </section>

      <section className="rounded-[30px] bg-white p-7">
        <h2 className="text-[28px] font-bold text-[#222831]">공간소개</h2>
        <label className="mt-4 block" htmlFor="description">
          <span className="sr-only">공간 소개</span>
          <textarea
            className="min-h-[220px] w-full rounded-[24px] bg-[#F8FBFB] p-[22px] text-[16px] font-medium leading-8 text-[#4F5D73] outline-none transition placeholder:text-[#A1AAB8] focus:ring-2 focus:ring-[#00ADB5]/20"
            id="description"
            name="description"
            onChange={(event) => handleFieldChange("description", event.target.value)}
            placeholder="공간의 특징과 활용 방식을 입력해 주세요."
            value={form.description}
          />
        </label>
      </section>

      <section className="rounded-[30px] bg-white p-7">
        <h2 className="text-[28px] font-bold text-[#222831]">공간정보</h2>
        <div className="mt-4 grid gap-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {infoFields.slice(0, 2).map((field) => (
              <FieldControl
                field={field}
                key={field.id}
                onChange={handleFieldChange}
                value={form[field.id as keyof FormState]}
              />
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {infoFields.slice(2, 4).map((field) => (
              <FieldControl
                field={field}
                key={field.id}
                onChange={handleFieldChange}
                value={form[field.id as keyof FormState]}
              />
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {infoFields.slice(4).map((field) => (
              <FieldControl
                field={field}
                key={field.id}
                onChange={handleFieldChange}
                value={form[field.id as keyof FormState]}
              />
            ))}
          </div>

          <div className="mt-2 flex w-full justify-end gap-3">
            <button
              className="h-14 w-[180px] rounded-full bg-[#F3F7F7] text-[15px] font-medium text-[#4F5D73]"
              onClick={handleDraftSave}
              type="button"
            >
              임시 저장
            </button>
            <button
              className="h-14 w-[220px] rounded-full bg-[#00ADB5] text-[15px] font-medium text-white"
              type="submit"
            >
              등록 요청하기
            </button>
          </div>

          {statusMessage ? (
            <p className="text-right text-[13px] font-medium text-[#5E687E]" aria-live="polite">
              {statusMessage}
            </p>
          ) : null}
        </div>
      </section>
    </form>
  );
}
