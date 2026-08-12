import java.util.List;

public class GreedyDemo {
    public static int maxSubarraySum(List<Integer> values) {
        if (values.isEmpty()) {
            return 0;
        }

        int best = values.get(0);
        int current = values.get(0);

        for (int i = 1; i < values.size(); i++) {
            int value = values.get(i);
            current = Math.max(value, current + value);
            best = Math.max(best, current);
        }

        return best;
    }
}
