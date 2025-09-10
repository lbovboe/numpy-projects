import numpy as np
import time

print('numpy version :',np.__version__)

# ===========================================
# COMPARING LIST/ARRAY CREATION TIME
# ===========================================

print('\n' + '='*50)
print('CREATION TIME COMPARISON (50,000 numbers)')
print('='*50)

# Python list creation (increasing order)
start_time = time.time()
python_list = list(range(50000))
python_creation_time = time.time() - start_time
print(f'Python list creation: {python_creation_time:.6f} seconds')

# Python list creation (alternative - list comprehension)
start_time = time.time()
python_list_comp = [i for i in range(50000)]
python_comp_creation_time = time.time() - start_time
print(f'Python list comprehension: {python_comp_creation_time:.6f} seconds')

# NumPy array creation (increasing order)
start_time = time.time()
numpy_array_range = np.arange(50000)
numpy_creation_time = time.time() - start_time
print(f'NumPy array creation: {numpy_creation_time:.6f} seconds')

# NumPy array from Python list
start_time = time.time()
numpy_from_list = np.array(python_list)
numpy_conversion_time = time.time() - start_time
print(f'NumPy from Python list: {numpy_conversion_time:.6f} seconds')

print(f'\nCreation speedup (NumPy vs Python): {python_creation_time/numpy_creation_time:.1f}x faster')

# ===========================================
# COMPARING DIFFERENT WAYS TO MULTIPLY BY 2
# ===========================================

original_list = python_list  # Use the 50,000 element list

print(f"\n\nOriginal list size: {len(original_list):,}")
print(f"First 10 elements: {original_list[:10]}")
print(f"Last 10 elements: {original_list[-10:]}")

# --------- PYTHON WAYS -------

# 1. WRONG WAY - List multiplication (repeats the list)
wrong_way = [1,2,3,4]
wrong_way = wrong_way * 2 # Creates [1,2,3,4,1,2,3,4] - NOT what we want!
print('\n1. WRONG - List multiplication:', wrong_way)

# 2. LIST COMPREHENSION (Pythonic and readable)
start_time = time.time()
list_comp_result = [x * 2 for x in original_list]
list_comp_time = time.time() - start_time
print(f'\n2. List comprehension result (first 10): {list_comp_result[:10]}')
print(f'   Time taken: {list_comp_time:.6f} seconds')

# 3. MAP FUNCTION (Functional approach)
start_time = time.time()
map_result = list(map(lambda x: x * 2, original_list))
map_time = time.time() - start_time
print(f'\n3. Map function result (first 10): {map_result[:10]}')
print(f'   Time taken: {map_time:.6f} seconds')

# 4. FOR LOOP WITH APPEND (Traditional approach)
start_time = time.time()
loop_result = []
for x in original_list:
    loop_result.append(x * 2)
loop_time = time.time() - start_time
print(f'\n4. For loop result (first 10): {loop_result[:10]}')
print(f'   Time taken: {loop_time:.6f} seconds')

# 5. IN-PLACE UPDATE (Modifies original list)
in_place_list = original_list.copy()  # Make a copy to preserve original
start_time = time.time()
for i in range(len(in_place_list)):
    in_place_list[i] *= 2
in_place_time = time.time() - start_time
print(f'\n5. In-place update result (first 10): {in_place_list[:10]}')
print(f'   Time taken: {in_place_time:.6f} seconds')
print('   Memory efficient: Modifies existing list instead of creating new one')

# --------- NUMPY WAY -------
# Use pre-created NumPy array for fair comparison
start_time = time.time()
numpy_result = numpy_array_range * 2
numpy_time = time.time() - start_time
print(f'\n6. NumPy vectorization result (first 10): {numpy_result[:10]}')
print(f'   Time taken: {numpy_time:.6f} seconds')

# Also show conversion + multiplication time for complete picture
start_time = time.time()
numpy_converted = np.array(original_list) * 2
numpy_with_conversion_time = time.time() - start_time
print(f'   With conversion time: {numpy_with_conversion_time:.6f} seconds')

# ===========================================
# PERFORMANCE COMPARISON
# ===========================================
print('\n' + '='*50)
print('PERFORMANCE RANKING (fastest to slowest):')
print('='*50)

methods = [
    ('NumPy vectorization (pre-created)', numpy_time),
    ('NumPy with conversion', numpy_with_conversion_time),
    ('List comprehension', list_comp_time),
    ('Map function', map_time),
    ('For loop with append', loop_time),
    ('In-place update', in_place_time)
]

# Sort by time (fastest first)
methods.sort(key=lambda x: x[1])

for i, (method, time_taken) in enumerate(methods, 1):
    speedup = methods[-1][1] / time_taken if time_taken > 0 else float('inf')
    print(f'{i}. {method}: {time_taken:.6f}s (Speedup: {speedup:.1f}x)')

# ===========================================
# WHEN TO USE EACH METHOD
# ===========================================
print('\n' + '='*50)
print('WHEN TO USE EACH METHOD:')
print('='*50)

print("""
1. LIST COMPREHENSION:
   ✅ Use when: Small to medium lists, need readable/Pythonic code
   ✅ Pros: Very readable, Pythonic, flexible (can add conditions)
   ❌ Cons: Slower for large datasets, creates new list
   
2. MAP FUNCTION:
   ✅ Use when: Applying simple function to all elements, functional style
   ✅ Pros: Memory efficient (lazy evaluation), clean for simple operations
   ❌ Cons: Less readable for complex operations, need to convert to list
   
3. FOR LOOP:
   ✅ Use when: Complex logic needed, beginners learning Python
   ✅ Pros: Easy to understand, very flexible
   ❌ Cons: Slowest method, not Pythonic for simple operations
   
4. IN-PLACE UPDATE:
   ✅ Use when: Memory is limited, don't need original list
   ✅ Pros: Most memory efficient, good for very large lists
   ❌ Cons: Modifies original data, not suitable when you need both versions
   
5. NUMPY VECTORIZATION:
   ✅ Use when: Large numerical datasets, scientific computing
   ✅ Pros: FASTEST for large data, memory efficient, supports N-dimensional
   ✅ Best for: Mathematical operations, array broadcasting, scientific computing
   ❌ Cons: Overhead for very small lists, requires NumPy dependency
""")

print('\n' + '='*50)
print('RECOMMENDATION:')
print('='*50)
print('• Small lists (< 100 items): List comprehension')
print('• Large numerical data: NumPy')
print('• Memory constrained: In-place update')
print('• Scientific computing: Always NumPy')
print('• Learning Python: Start with for loops, progress to list comprehension')