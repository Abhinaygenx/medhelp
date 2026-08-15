// Mock API helper simulating async network operations with loading states & error handling

export const simulateApiCall = async (
  data,
  shouldFail = false,
  delay = 600
) => {
  await new Promise((resolve) => setTimeout(resolve, delay))

  if (shouldFail) {
    throw new Error('Network request failed. Please check connectivity.')
  }

  return data
}
