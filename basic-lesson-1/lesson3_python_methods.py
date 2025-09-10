import time

print('='*50)
print('LESSON 3: PYTHON MULTIPLICATION METHODS')
print('='*50)

test_list = list(range(50000))
print(f'Testing with {len(test_list):,} numbers...\n')

# WRONG WAY - Common mistake
print('❌ COMMON MISTAKE:')
wrong_example = [1, 2, 3, 4]
wrong_result = wrong_example * 2
print(f'[1,2,3,4] * 2 = {wrong_result}')
print('This REPEATS the list, not multiply elements!\n')

print('✅ CORRECT PYTHON METHODS:\n')

# 1. List Comprehension
start_time = time.time()
list_comp_result = [x * 2 for x in test_list]
list_comp_time = time.time() - start_time
print(f'1. List Comprehension: {list_comp_time:.6f}s')
print(f'   Result: {list_comp_result[:5]}...')
print('   ✅ Most Pythonic and readable')
print('   ✅ Can add conditions: [x*2 for x in list if x > 10]')

# 2. Map Function
start_time = time.time()
map_result = list(map(lambda x: x * 2, test_list))
map_time = time.time() - start_time
print(f'\n2. Map Function: {map_time:.6f}s')
print(f'   Result: {map_result[:5]}...')
print('   ✅ Functional programming style')
print('   ✅ Memory efficient (lazy evaluation)')

# 3. For Loop with Append
start_time = time.time()
loop_result = []
for x in test_list:
    loop_result.append(x * 2)
loop_time = time.time() - start_time
print(f'\n3. For Loop + Append: {loop_time:.6f}s')
print(f'   Result: {loop_result[:5]}...')
print('   ✅ Most flexible for complex logic')
print('   ❌ Slowest method')

# 4. In-place Update
in_place_list = test_list.copy()
start_time = time.time()
for i in range(len(in_place_list)):
    in_place_list[i] *= 2
in_place_time = time.time() - start_time
print(f'\n4. In-place Update: {in_place_time:.6f}s')
print(f'   Result: {in_place_list[:5]}...')
print('   ✅ Most memory efficient')
print('   ❌ Modifies original data')

print('\n' + '='*30)
print('WHEN TO USE EACH METHOD:')
print('='*30)

print("""
📚 LIST COMPREHENSION:
   Use when: Small-medium lists, readable code needed
   Example: [x*2 for x in numbers if x > 0]

🔧 MAP FUNCTION:
   Use when: Simple function application, functional style
   Example: list(map(str.upper, words))

🔄 FOR LOOP:
   Use when: Complex logic, multiple operations per item
   Example: Processing with conditions and multiple calculations

💾 IN-PLACE UPDATE:
   Use when: Memory is critical, original data not needed
   Example: Large datasets where memory usage matters
""")

print(f"""
⏱️  Performance Summary:
    Fastest: List Comprehension ({list_comp_time:.6f}s)
    Memory: In-place Update (no extra memory)
    Flexible: For Loop (handles any complexity)
    
Next: lesson4_numpy_vectorization.py - See NumPy's power!
""")