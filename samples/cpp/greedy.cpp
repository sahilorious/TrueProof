#include <algorithm>
#include <iostream>
#include <vector>

int max_subarray_sum(const std::vector<int>& values) {
    if (values.empty()) {
        return 0;
    }

    int best = values[0];
    int current = values[0];

    for (size_t i = 1; i < values.size(); ++i) {
        current = std::max(values[i], current + values[i]);
        best = std::max(best, current);
    }

    return best;
}

int main() {
    std::vector<int> values = {3, -2, 5, -1, 6, -3};
    std::cout << max_subarray_sum(values) << "\n";
    return 0;
}
