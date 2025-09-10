import numpy as np
import time

print('='*50)
print('LESSON 2: CREATION TIME COMPARISON')
print('='*50)

print('Comparing creation of 50,000 numbers in increasing order...\n')

# Python list creation methods
start_time = time.time()
python_list = list(range(50000))
python_creation_time = time.time() - start_time
print(f'1. Python list(range): {python_creation_time:.6f} seconds')

start_time = time.time()
python_list_comp = [i for i in range(50000)]
python_comp_creation_time = time.time() - start_time
print(f'2. List comprehension: {python_comp_creation_time:.6f} seconds')

# NumPy array creation methods
start_time = time.time()
numpy_array_range = np.arange(50000)
numpy_creation_time = time.time() - start_time
print(f'3. NumPy np.arange(): {numpy_creation_time:.6f} seconds')

start_time = time.time()
numpy_from_list = np.array(python_list)
numpy_conversion_time = time.time() - start_time
print(f'4. NumPy from list: {numpy_conversion_time:.6f} seconds')

print('\n' + '='*30)
print('CREATION SPEED RANKING:')
print('='*30)

creation_methods = [
    ('NumPy np.arange()', numpy_creation_time),
    ('Python list(range)', python_creation_time),
    ('List comprehension', python_comp_creation_time),
    ('NumPy from list', numpy_conversion_time)
]

creation_methods.sort(key=lambda x: x[1])

for i, (method, time_taken) in enumerate(creation_methods, 1):
    speedup = creation_methods[-1][1] / time_taken
    print(f'{i}. {method}: {speedup:.1f}x faster')

print(f'\n📊 NumPy is {python_creation_time/numpy_creation_time:.1f}x faster than Python lists!')

print("""
💡 Key Takeaways:
• NumPy array creation is significantly faster
• Converting Python lists to NumPy has overhead
• Use NumPy native functions (arange, zeros, ones) when possible
• For large datasets, create NumPy arrays directly

Next: lesson3_python_methods.py - Different Python multiplication methods
""")