"use client";

import { type FormEvent, useState } from "react";
import { getAccessToken } from "@/lib/current-user";

const infoFields = [
  {
    id: "category",
    label: "카테고리",
    type: "select" as const,
    options: ["팝업 스토어", "전시", "쇼룸", "스튜디오"],
  },
  {
    id: "region",
    label: "지역 / 주소",
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
    placeholder: "예) 120000",
  },
  {
    id: "contact",
    label: "연락 방식",
    type: "select" as const,
    options: ["이메일 + 플랫폼 메시지", "이메일", "플랫폼 메시지"],
  },
  {
    id: "lat",
    label: "위도",
    type: "input" as const,
    placeholder: "예) 37.5443",
  },
  {
    id: "lng",
    label: "경도",
    type: "input" as const,
    placeholder: "예) 127.0557",
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
  price: "120000",
  contact: "이메일 + 플랫폼 메시지",
  lat: "37.5443",
  lng: "127.0557",
};

type FormState = typeof initialForm;
type StatusType = "idle" | "saving" | "success" | "error";

const DRAFT_KEY = "momentlit.space-create.draft";

function loadDraft() {
  if (typeof window === "undefined") {
    return null;
  }

  const savedDraft = window.sessionStorage.getItem(DRAFT_KEY);

  if (!savedDraft) {
    return null;
  }

  try {
    const parsedDraft = JSON.parse(savedDraft) as {
      form?: Partial<FormState>;
    };

    return parsedDraft.form ?? null;
  } catch {
    window.sessionStorage.removeItem(DRAFT_KEY);
    return null;
  }
}

function getResponseMessage(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const message = (payload as { message?: unknown }).message;

  return typeof message === "string" ? message : null;
}

function getResponseSpaceId(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const data = (payload as { data?: unknown }).data;

  if (!data || typeof data !== "object") {
    return null;
  }

  const spaceId = (data as { space_id?: unknown }).space_id;

  return typeof spaceId === "number" ? spaceId : null;
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("이미지를 변환하지 못했습니다."));
    };

    reader.onerror = () => {
      reject(new Error("이미지를 읽는 중 오류가 발생했습니다."));
    };

    reader.readAsDataURL(file);
  });
}

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
    "h-[58px] w-full rounded-[16px] border border-[#C8E4E6] bg-white px-[18px] text-[15px] font-medium text-[#222831] outline-none transition placeholder:text-[#A1AAB8] focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/10";

  if (field.type === "select") {
    return (
      <label className="flex flex-col gap-2" htmlFor={field.id}>
        <span className="text-[14px] font-semibold text-[#222831]">
          {field.label}
        </span>
        <select
          className={commonClassName}
          id={field.id}
          name={field.id}
          required
          value={value}
          onChange={(event) =>
            onChange(field.id as keyof FormState, event.target.value)
          }
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
      <span className="text-[14px] font-semibold text-[#222831]">
        {field.label}
      </span>
      <input
        className={commonClassName}
        id={field.id}
        inputMode={field.id === "lat" || field.id === "lng" ? "decimal" : "text"}
        name={field.id}
        onChange={(event) =>
          onChange(field.id as keyof FormState, event.target.value)
        }
        placeholder={field.placeholder}
        required
        value={value}
      />
    </label>
  );
}

export function SpaceCreateForm({
  imageFiles,
  selectedDates,
}: {
  imageFiles: (File | null)[];
  selectedDates: string[];
}) {
  const [form, setForm] = useState<FormState>(() => ({
    ...initialForm,
    ...loadDraft(),
  }));
  const [statusMessage, setStatusMessage] = useState(() =>
    loadDraft() ? "임시 저장된 내용을 불러왔습니다." : "",
  );
  const [statusType, setStatusType] = useState<StatusType>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (name: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleDraftSave = () => {
    window.sessionStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        form,
      }),
    );
    setStatusType("success");
    setStatusMessage("임시 저장했습니다.");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusType("idle");
    setStatusMessage("");

    const accessToken = getAccessToken();

    if (!accessToken) {
      setStatusType("error");
      setStatusMessage("로그인 후 다시 시도해주세요.");
      return;
    }

    const pricePerHour = Number(form.price.replace(/[^\d]/g, ""));
    const lat = Number(form.lat);
    const lng = Number(form.lng);
    const selectedFiles = imageFiles.filter((file): file is File => Boolean(file));

    if (selectedFiles.length === 0) {
      setStatusType("error");
      setStatusMessage("대표 사진을 선택해주세요.");
      return;
    }

    if (Number.isNaN(pricePerHour) || pricePerHour <= 0) {
      setStatusType("error");
      setStatusMessage("희망 대관 단가를 숫자로 입력해주세요.");
      return;
    }

    if (Number.isNaN(lat) || Number.isNaN(lng)) {
      setStatusType("error");
      setStatusMessage("위도와 경도를 숫자로 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setStatusType("saving");

    try {
      const imageDataUrls = await Promise.all(selectedFiles.map(fileToDataUrl));

      const response = await fetch("/api/spaces", {
        body: JSON.stringify({
          name: form.title.trim(),
          description: form.description.trim() || null,
          address: form.region.trim(),
          thumbnail_url: imageDataUrls[0],
          image_urls: imageDataUrls,
          price_per_hour: pricePerHour,
          category: form.category,
          lat,
          lng,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        method: "POST",
      });

      const responseText = await response.text();
      let payload: unknown = null;

      if (responseText) {
        try {
          payload = JSON.parse(responseText) as unknown;
        } catch {
          payload = { message: responseText };
        }
      }

      if (!response.ok) {
        const message = getResponseMessage(payload) ?? "등록 요청에 실패했습니다.";

        throw new Error(message);
      }

      const spaceId = getResponseSpaceId(payload);

      window.sessionStorage.removeItem(DRAFT_KEY);
      setStatusType("success");
      setStatusMessage(
        spaceId
          ? `공간 등록 요청이 완료되었습니다. 공간 ID ${spaceId}`
          : "공간 등록 요청이 완료되었습니다.",
      );
    } catch (error) {
      setStatusType("error");
      setStatusMessage(
        error instanceof Error ? error.message : "등록 요청에 실패했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <section className="rounded-[30px] bg-white p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-[28px] font-bold text-[#222831]">제목</h2>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#E8F6F7] px-4 py-2 text-[12px] font-semibold text-[#008992]">
              선택 일정 {selectedDates.length}일
            </span>
            <span className="rounded-full bg-[#F3F7F7] px-4 py-2 text-[12px] font-semibold text-[#67728A]">
              이미지 {imageFiles.filter((file) => file).length}장
            </span>
          </div>
        </div>
        <label className="mt-4 block" htmlFor="title">
          <span className="sr-only">제목</span>
          <input
            className="flex h-[58px] w-full items-center rounded-[16px] border border-[#C8E4E6] bg-white px-[18px] text-[15px] font-medium text-[#222831] outline-none transition placeholder:text-[#99A1B1] focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/10"
            id="title"
            name="title"
            onChange={(event) => handleFieldChange("title", event.target.value)}
            placeholder="예) 성수 브랜드 팝업 전용 쇼룸"
            required
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
            onChange={(event) =>
              handleFieldChange("description", event.target.value)
            }
            placeholder="공간의 특징과 활용 방식을 입력해 주세요."
            required
            value={form.description}
          />
        </label>
      </section>

      <section className="rounded-[30px] bg-white p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[28px] font-bold text-[#222831]">공간정보</h2>
            <p className="mt-2 text-[14px] font-medium text-[#67728A]">
              위도와 경도는 현재 등록 API 필수값이라 직접 입력해야 합니다.
            </p>
          </div>
          <span className="rounded-full bg-[#F3F7F7] px-4 py-2 text-[12px] font-semibold text-[#67728A]">
            백엔드 필수값 연결됨
          </span>
        </div>

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
            {infoFields.slice(4, 6).map((field) => (
              <FieldControl
                field={field}
                key={field.id}
                onChange={handleFieldChange}
                value={form[field.id as keyof FormState]}
              />
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {infoFields.slice(6).map((field) => (
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
              className="h-14 w-[180px] rounded-full bg-[#F3F7F7] text-[15px] font-medium text-[#4F5D73] transition hover:bg-[#EAF2F2]"
              onClick={handleDraftSave}
              type="button"
            >
              임시 저장
            </button>
            <button
              className="h-14 w-[220px] rounded-full bg-[#00ADB5] text-[15px] font-medium text-white transition hover:bg-[#00979E] disabled:cursor-not-allowed disabled:bg-[#7CCDD1]"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "등록 중..." : "등록 요청하기"}
            </button>
          </div>

          {statusMessage ? (
            <p
              className={`text-right text-[13px] font-medium ${
                statusType === "error" ? "text-[#C24A4A]" : "text-[#5E687E]"
              }`}
              aria-live="polite"
            >
              {statusMessage}
            </p>
          ) : null}
        </div>
      </section>
    </form>
  );
}
