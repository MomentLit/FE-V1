"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useMyPageUser } from "@/components/mypage/MyPageShell";
import { updateCurrentUser } from "@/lib/current-user";

function formatCreatedAt(createdAt: string) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "날짜 정보 없음";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function ProfileEdit() {
  const { setCurrentUser, user } = useMyPageUser();
  const [name, setName] = useState(user.name);
  const [imageUrl, setImageUrl] = useState(user.image_url ?? "");
  const [saveError, setSaveError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [saving, setSaving] = useState(false);

  function handleCancel() {
    setName(user.name);
    setImageUrl(user.image_url ?? "");
    setSaveError("");
    setSaveMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveError("");
    setSaveMessage("");

    const trimmedName = name.trim();

    if (!trimmedName) {
      setSaveError("이름을 입력해주세요.");
      return;
    }

    setSaving(true);

    try {
      const updatedUser = await updateCurrentUser({
        name: trimmedName,
        image_url: imageUrl.trim() || null,
      });

      setName(updatedUser.name);
      setImageUrl(updatedUser.image_url ?? "");
      setCurrentUser(updatedUser);
      setSaveMessage("프로필 정보가 저장되었습니다.");
    } catch {
      setSaveError("프로필 정보를 저장하지 못했습니다.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="flex w-[932px] flex-col gap-6">
      <div className="flex flex-col gap-2.5 pb-1">
        <p className="text-[12px] font-medium text-[#00ADB5]">
          MOMENTLIT MY PAGE
        </p>
        <h2 className="text-[42px] font-bold text-[#222831]">정보 수정</h2>
      </div>

      <form
        className="flex flex-col gap-6 rounded-[30px] bg-white p-7"
        onSubmit={handleSubmit}
      >
        <h3 className="text-[30px] font-bold text-[#222831]">
          프로필 기본 정보
        </h3>
        <p className="text-[15px] font-medium text-[#5E687E]">
          이름과 프로필 이미지만 수정할 수 있습니다.
        </p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          <label className="flex flex-col gap-2" htmlFor="name">
            <span className="text-[14px] font-medium text-[#111111]">이름</span>
            <input
              className="h-[52px] rounded-2xl border border-[#C8E4E6] bg-white px-[18px] text-[15px] text-[#666666] outline-none transition focus:border-[#00ADB5]"
              id="name"
              onChange={(event) => setName(event.target.value)}
              required
              type="text"
              value={name}
            />
          </label>
          <label className="flex flex-col gap-2" htmlFor="email">
            <span className="text-[14px] font-medium text-[#111111]">
              이메일
            </span>
            <input
              className="h-[52px] rounded-2xl border border-[#C8E4E6] bg-[#F8FBFB] px-[18px] text-[15px] text-[#666666]"
              id="email"
              readOnly
              type="email"
              value={user.email}
            />
          </label>
          <label
            className="col-span-2 flex flex-col gap-2"
            htmlFor="image-url"
          >
            <span className="text-[14px] font-medium text-[#111111]">
              프로필 이미지 URL
            </span>
            <input
              className="h-[52px] rounded-2xl border border-[#C8E4E6] bg-white px-[18px] text-[15px] text-[#666666] outline-none transition focus:border-[#00ADB5]"
              id="image-url"
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://example.com/profile.jpg"
              type="url"
              value={imageUrl}
            />
          </label>
          <label
            className="col-span-2 flex flex-col gap-2"
            htmlFor="created-at"
          >
            <span className="text-[14px] font-medium text-[#111111]">
              가입일
            </span>
            <input
              className="h-[52px] rounded-2xl border border-[#C8E4E6] bg-[#F8FBFB] px-[18px] text-[15px] text-[#666666]"
              id="created-at"
              readOnly
              type="text"
              value={formatCreatedAt(user.created_at)}
            />
          </label>
        </div>

        {saveError || saveMessage ? (
          <p
            className={`text-right text-[14px] font-medium ${
              saveError ? "text-[#B34848]" : "text-[#008992]"
            }`}
            role={saveError ? "alert" : "status"}
          >
            {saveError || saveMessage}
          </p>
        ) : null}

        <div className="flex justify-end gap-3">
          <button
            className="h-14 w-[180px] rounded-full bg-[#F3F7F7] text-[15px] font-medium text-[#4F5D73]"
            disabled={saving}
            onClick={handleCancel}
            type="button"
          >
            취소
          </button>
          <button
            className="h-14 w-[220px] rounded-full bg-[#00ADB5] text-[15px] font-medium text-white disabled:opacity-60"
            disabled={saving}
            type="submit"
          >
            {saving ? "저장 중..." : "저장하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
