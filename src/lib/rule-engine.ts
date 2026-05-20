interface Condition {
  questionId: string;
  operator: "equals" | "contains" | "not_equals";
  value: string;
}

interface Rules {
  conditions: Condition[];
  logic: "AND" | "OR";
}

export function evaluateRules(
  rules: Rules,
  answers: Record<string, unknown>
): boolean {
  if (!rules.conditions || rules.conditions.length === 0) return true;

  const results = rules.conditions.map((condition) => {
    const answer = answers[condition.questionId];
    if (answer === undefined || answer === null) return false;

    switch (condition.operator) {
      case "equals":
        return answer === condition.value;
      case "not_equals":
        return answer !== condition.value;
      case "contains":
        if (Array.isArray(answer)) {
          return answer.includes(condition.value);
        }
        if (typeof answer === "string") {
          return answer.includes(condition.value);
        }
        return false;
      default:
        return false;
    }
  });

  if (rules.logic === "OR") {
    return results.some((r) => r);
  }
  return results.every((r) => r);
}
