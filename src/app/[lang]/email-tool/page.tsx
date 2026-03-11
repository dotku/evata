"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getTranslation, type Language } from "../../i18n/translations";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
}

interface Recipient {
  email: string;
  name: string;
}

const toolLabels: Record<Language, Record<string, string>> = {
  en: {
    title: "Email Campaign Tool",
    subtitle: "Compose and send marketing emails to your leads",
    backToHome: "Back to Home",
    recipients: "Recipients",
    addRecipient: "Add Recipient",
    importCsv: "Import CSV",
    recipientName: "Name",
    recipientEmail: "Email",
    remove: "Remove",
    template: "Email Template",
    selectTemplate: "Select a template...",
    customEmail: "Custom Email",
    subject: "Subject",
    senderName: "Sender Name",
    preview: "Preview",
    emailContent: "Email Content (HTML)",
    send: "Send Emails",
    sending: "Sending...",
    sent: "Sent!",
    result: "Result",
    sentCount: "Sent",
    failedCount: "Failed",
    noRecipients: "Add at least one recipient",
    recipientCount: "recipients",
    clearAll: "Clear All",
    personalize: "Use {{name}} in templates for personalization",
  },
  zh: {
    title: "邮件营销工具",
    subtitle: "编写和发送营销邮件给您的潜在客户",
    backToHome: "返回首页",
    recipients: "收件人",
    addRecipient: "添加收件人",
    importCsv: "导入 CSV",
    recipientName: "姓名",
    recipientEmail: "邮箱",
    remove: "删除",
    template: "邮件模板",
    selectTemplate: "选择模板...",
    customEmail: "自定义邮件",
    subject: "主题",
    senderName: "发件人名称",
    preview: "预览",
    emailContent: "邮件内容 (HTML)",
    send: "发送邮件",
    sending: "发送中...",
    sent: "已发送！",
    result: "结果",
    sentCount: "已发送",
    failedCount: "失败",
    noRecipients: "请至少添加一位收件人",
    recipientCount: "位收件人",
    clearAll: "清空",
    personalize: "在模板中使用 {{name}} 进行个性化",
  },
  kr: {
    title: "이메일 캠페인 도구",
    subtitle: "리드에게 마케팅 이메일을 작성하고 발송하세요",
    backToHome: "홈으로 돌아가기",
    recipients: "수신자",
    addRecipient: "수신자 추가",
    importCsv: "CSV 가져오기",
    recipientName: "이름",
    recipientEmail: "이메일",
    remove: "삭제",
    template: "이메일 템플릿",
    selectTemplate: "템플릿 선택...",
    customEmail: "커스텀 이메일",
    subject: "제목",
    senderName: "발신자 이름",
    preview: "미리보기",
    emailContent: "이메일 내용 (HTML)",
    send: "이메일 발송",
    sending: "발송 중...",
    sent: "발송 완료!",
    result: "결과",
    sentCount: "발송됨",
    failedCount: "실패",
    noRecipients: "최소 한 명의 수신자를 추가하세요",
    recipientCount: "명 수신자",
    clearAll: "전체 삭제",
    personalize: "템플릿에서 {{name}}을 사용하여 개인화하세요",
  },
};

export default function EmailToolPage() {
  const params = useParams();
  const lang = (params.lang as Language) || "en";
  const t = getTranslation(lang);
  const l = toolLabels[lang];

  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [recipients, setRecipients] = useState<Recipient[]>([
    { email: "", name: "" },
  ]);
  const [subject, setSubject] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [senderName, setSenderName] = useState("Evata");
  const [showPreview, setShowPreview] = useState(false);
  const [sendStatus, setSendStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [sendResult, setSendResult] = useState<{
    sent: number;
    failed: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/email/templates")
      .then((res) => res.json())
      .then(setTemplates)
      .catch(console.error);
  }, []);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (templateId === "custom") {
      setSubject("");
      setHtmlContent("");
      return;
    }
    const tpl = templates.find((t) => t.id === templateId);
    if (tpl) {
      setSubject(tpl.subject);
      setHtmlContent(tpl.html);
    }
  };

  const addRecipient = () => {
    setRecipients([...recipients, { email: "", name: "" }]);
  };

  const removeRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const updateRecipient = (
    index: number,
    field: "email" | "name",
    value: string
  ) => {
    const updated = [...recipients];
    updated[index][field] = value;
    setRecipients(updated);
  };

  const handleCsvImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split("\n").filter((line) => line.trim());
      const newRecipients: Recipient[] = [];
      for (let i = 0; i < lines.length; i++) {
        const parts = lines[i].split(",").map((p) => p.trim().replace(/"/g, ""));
        if (parts.length >= 1 && parts[0].includes("@")) {
          newRecipients.push({ email: parts[0], name: parts[1] || "" });
        } else if (parts.length >= 2 && parts[1].includes("@")) {
          newRecipients.push({ email: parts[1], name: parts[0] || "" });
        }
      }
      if (newRecipients.length > 0) {
        setRecipients((prev) => [
          ...prev.filter((r) => r.email),
          ...newRecipients,
        ]);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleSend = async () => {
    const validRecipients = recipients.filter((r) => r.email.trim());
    if (validRecipients.length === 0 || !subject || !htmlContent) return;

    setSendStatus("sending");
    try {
      const res = await fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients: validRecipients,
          subject,
          htmlContent,
          senderName,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSendStatus("sent");
        setSendResult({ sent: data.sent, failed: data.failed });
      } else {
        setSendStatus("error");
      }
    } catch {
      setSendStatus("error");
    }
  };

  const validCount = recipients.filter((r) => r.email.trim()).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {l.title}
            </h1>
            <p className="text-sm text-gray-500">{l.subtitle}</p>
          </div>
          <Link
            href={`/${lang}`}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            &larr; {l.backToHome}
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Recipients + Template */}
          <div className="space-y-6">
            {/* Recipients */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {l.recipients}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    ({validCount} {l.recipientCount})
                  </span>
                </h2>
                <div className="flex gap-2">
                  <label className="cursor-pointer text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    {l.importCsv}
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleCsvImport}
                      className="hidden"
                    />
                  </label>
                  {recipients.length > 1 && (
                    <button
                      onClick={() => setRecipients([{ email: "", name: "" }])}
                      className="text-sm px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      {l.clearAll}
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {recipients.map((r, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder={l.recipientName}
                      value={r.name}
                      onChange={(e) => updateRecipient(i, "name", e.target.value)}
                      className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 outline-none"
                    />
                    <input
                      type="email"
                      placeholder={l.recipientEmail}
                      value={r.email}
                      onChange={(e) =>
                        updateRecipient(i, "email", e.target.value)
                      }
                      className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 outline-none"
                    />
                    <button
                      onClick={() => removeRecipient(i)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      title={l.remove}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addRecipient}
                className="mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                + {l.addRecipient}
              </button>
            </div>

            {/* Template Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {l.template}
              </h2>
              <select
                value={selectedTemplate}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 outline-none mb-4"
              >
                <option value="">{l.selectTemplate}</option>
                {templates.map((tpl) => (
                  <option key={tpl.id} value={tpl.id}>
                    {tpl.name}
                  </option>
                ))}
                <option value="custom">{l.customEmail}</option>
              </select>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {l.senderName}
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {l.subject}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {l.emailContent}
                  </label>
                  <textarea
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 outline-none font-mono text-sm resize-y"
                  />
                  <p className="text-xs text-gray-400 mt-1">{l.personalize}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Preview + Send */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {l.preview}
                </h2>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  {showPreview ? "HTML" : l.preview}
                </button>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden min-h-[400px] bg-gray-50">
                {htmlContent ? (
                  showPreview ? (
                    <iframe
                      srcDoc={htmlContent.replace(
                        /\{\{name\}\}/g,
                        "John Doe"
                      )}
                      className="w-full h-[500px] border-0"
                      title="Email Preview"
                      sandbox=""
                    />
                  ) : (
                    <pre className="p-4 text-xs text-gray-600 whitespace-pre-wrap overflow-auto max-h-[500px]">
                      {htmlContent}
                    </pre>
                  )
                ) : (
                  <div className="flex items-center justify-center h-[400px] text-gray-400">
                    {l.selectTemplate}
                  </div>
                )}
              </div>
            </div>

            {/* Send */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <button
                onClick={handleSend}
                disabled={
                  sendStatus === "sending" ||
                  validCount === 0 ||
                  !subject ||
                  !htmlContent
                }
                className="w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sendStatus === "sending"
                  ? l.sending
                  : sendStatus === "sent"
                    ? l.sent
                    : `${l.send} (${validCount} ${l.recipientCount})`}
              </button>

              {sendResult && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {l.result}
                  </h3>
                  <div className="flex gap-4 text-sm">
                    <span className="text-emerald-600">
                      {l.sentCount}: {sendResult.sent}
                    </span>
                    <span className="text-red-600">
                      {l.failedCount}: {sendResult.failed}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
