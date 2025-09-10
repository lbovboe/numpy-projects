import numpy as np
import time

print('='*50)
print('LESSON 5: COMPLETE PERFORMANCE ANALYSIS')
print('='*50)

# Test data
test_size = 50000
python_list = list(range(test_size))
numpy_array = np.arange(test_size)

print(f'Final comparison with {test_size:,} numbers\n')

# All methods from previous lessons
methods_data = []

# Python methods
start_time = time.time()
list_comp_result = [x * 2 for x in python_list]
list_comp_time = time.time() - start_time
methods_data.append(('List Comprehension', list_comp_time, 'Python'))

start_time = time.time()
map_result = list(map(lambda x: x * 2, python_list))
map_time = time.time() - start_time
methods_data.append(('Map Function', map_time, 'Python'))

start_time = time.time()
loop_result = []
for x in python_list:
    loop_result.append(x * 2)
loop_time = time.time() - start_time
methods_data.append(('For Loop + Append', loop_time, 'Python'))

in_place_list = python_list.copy()
start_time = time.time()
for i in range(len(in_place_list)):
    in_place_list[i] *= 2
in_place_time = time.time() - start_time
methods_data.append(('In-place Update', in_place_time, 'Python'))

# NumPy methods
start_time = time.time()
numpy_result = numpy_array * 2
numpy_time = time.time() - start_time
methods_data.append(('NumPy Vectorization', numpy_time, 'NumPy'))

start_time = time.time()
numpy_converted = np.array(python_list) * 2
numpy_conversion_time = time.time() - start_time
methods_data.append(('NumPy with Conversion', numpy_conversion_time, 'NumPy'))

# Sort by performance
methods_data.sort(key=lambda x: x[1])

print('🏆 FINAL PERFORMANCE RANKING:')
print('='*50)

fastest_time = methods_data[0][1]
for i, (method, time_taken, category) in enumerate(methods_data, 1):
    speedup = methods_data[-1][1] / time_taken
    category_icon = '🐍' if category == 'Python' else '⚡'
    print(f'{i}. {category_icon} {method}:')
    print(f'   Time: {time_taken:.6f}s (Speedup: {speedup:.1f}x)')

print('\n' + '='*50)
print('📊 KEY INSIGHTS:')
print('='*50)

numpy_pure = next(x[1] for x in methods_data if x[0] == 'NumPy Vectorization')
list_comp = next(x[1] for x in methods_data if x[0] == 'List Comprehension')
numpy_convert = next(x[1] for x in methods_data if x[0] == 'NumPy with Conversion')

print(f"""
1. 🚀 NumPy is {list_comp/numpy_pure:.1f}x faster than list comprehension
2. ⚠️  Conversion overhead matters: {numpy_convert/numpy_pure:.1f}x slower
3. 🐍 List comprehension is still competitive for mixed workflows
4. 💾 In-place updates save memory but aren't always fastest
5. 🔄 For loops are most flexible but slowest
""")

print('='*50)
print('🎯 DECISION GUIDE:')
print('='*50)

print(f"""
CHOOSE NUMPY WHEN:
✅ Working with large numerical datasets (>{test_size//10:,}+ items)
✅ Performing mathematical operations
✅ Data is already in NumPy format
✅ Need broadcasting or advanced operations
✅ Scientific/engineering applications

CHOOSE PYTHON WHEN:
✅ Small datasets (<1,000 items)
✅ Mixed data types (strings, objects)  
✅ Complex conditional logic needed
✅ Integration with non-numerical Python libraries
✅ Prototype/learning phase

MEMORY CONSIDERATIONS:
💾 In-place updates: No extra memory
💾 NumPy arrays: 4-8x less memory than Python lists
💾 List comprehension: Creates new list (2x memory)
""")

print('='*50)
print('🎓 COURSE SUMMARY:')
print('='*50)

print(f"""
You've learned:
📚 Lesson 1: NumPy basics and benefits
⏱️  Lesson 2: Creation time comparison (NumPy 7x faster)
🐍 Lesson 3: Python multiplication methods
⚡ Lesson 4: NumPy vectorization power  
🏆 Lesson 5: Complete performance analysis

Key takeaway: NumPy transforms Python into a high-performance 
numerical computing platform. Use it for scientific computing!

Next steps: Explore NumPy's linear algebra, statistics, and
broadcasting capabilities for real-world applications.
""")

# Save performance results
results_summary = f"""
Performance Results ({test_size:,} elements):
{'='*40}
"""
for method, time_taken, category in methods_data:
    results_summary += f"{method}: {time_taken:.6f}s\n"

print(f"\n💾 Results saved to performance_results.txt")
with open('/Users/caijianbo/Documents/numpy-projects/basic-lesson-1/performance_results.txt', 'w') as f:
    f.write(results_summary)