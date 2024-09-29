function useGenerateUniqueId() {
  const randomId = crypto.randomUUID();
  return { randomId };
}

export default useGenerateUniqueId;
