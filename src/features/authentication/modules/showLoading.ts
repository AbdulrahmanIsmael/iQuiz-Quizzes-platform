export default function loadingStatus(
  isLoading: boolean,
  form: HTMLDivElement
): void {
  const loading = <HTMLDivElement>document.getElementById("loading");
  if (isLoading) {
    if (!form.classList.contains("hidden")) form.classList.add("hidden");
    if (loading.classList.contains("hidden"))
      loading.classList.remove("hidden");
  } else {
    if (form.classList.contains("hidden")) form.classList.remove("hidden");
    if (!loading.classList.contains("hidden")) loading.classList.add("hidden");
  }
}
